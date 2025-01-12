// server/api/upload.post.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 环境变量检查
const checkEnvVariables = (config: any) => {
  const required = [
    'CLOUDFLARE_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'R2_PUBLIC_URL'
  ];

  const missing = required.filter(key => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  // 打印配置信息（注意不要打印实际的密钥）
  console.log('R2 Configuration:', {
    accountId: config.CLOUDFLARE_ACCOUNT_ID,
    bucketName: config.R2_BUCKET_NAME,
    endpoint: `https://${config.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    publicUrl: config.R2_PUBLIC_URL,
    hasAccessKey: !!config.R2_ACCESS_KEY_ID,
    hasSecretKey: !!config.R2_SECRET_ACCESS_KEY
  });
}

// 带重试机制的上传函数
const uploadWithRetry = async (client: S3Client, command: PutObjectCommand, retries = 0) => {
  try {
    return await client.send(command);
  } catch (error) {
    console.error('Upload error details:', {
      message: (error as any).message,
      code: (error as any).code,
      name: (error as any).name,
      requestId: (error as any).$metadata?.requestId
    });

    if (retries < MAX_RETRIES) {
      console.log(`Upload failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
      await sleep(RETRY_DELAY);
      return uploadWithRetry(client, command, retries + 1);
    }
    throw error;
  }
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  try {
    // 检查环境变量
    checkEnvVariables(config);

    // 初始化 S3 客户端
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.R2_ACCESS_KEY_ID as string,
        secretAccessKey: config.R2_SECRET_ACCESS_KEY as string,
      },
    });

    // 读取上传的文件
    const formData = await readMultipartFormData(event);
    if (!formData || !formData[0]) {
      throw new Error('No file uploaded');
    }

    const file = formData[0];
    const fileExt = file.filename?.split('.').pop() || 'jpg';
    const fileName = `${randomUUID()}.${fileExt}`;

    // 添加详细的文件信息日志
    // console.log('Upload attempt:', {
    //   fileName,
    //   originalName: file.filename,
    //   contentType: file.type,
    //   fileSize: file.data.length,
    //   bucketName: config.R2_BUCKET_NAME
    // });

    // 执行上传
    const command = new PutObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: fileName,
      Body: file.data,
      ContentType: file.type,
    });

    console.log('Sending upload command...');
    const result = await uploadWithRetry(s3Client, command);
    console.log('Upload result:', result);

    // 构建公共访问 URL
    const publicUrl = `${config.R2_PUBLIC_URL}/${fileName}`;

    return {
      success: true,
      url: publicUrl,
      fileName: fileName
    };
  } catch (error: any) {
    console.error('Handler error:', error);
    return {
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  }
});