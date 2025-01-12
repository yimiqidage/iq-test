export default defineEventHandler(async (event) => {
    // Mock OCR 任务创建响应
    return {
      taskId: 'mock-task-123'
    }
  })