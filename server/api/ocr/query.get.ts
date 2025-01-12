// server/api/ocr/query.get.ts
export default defineEventHandler(async (event) => {
    // 添加 5 秒延迟
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Mock OCR 查询响应
    return {
      status: 'completed',
      result: 'abcd'
    }
  })