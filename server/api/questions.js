// server/api/questions.js
import fs from 'fs'
import path from 'path'

// 修改函数名和逻辑,只返回一个随机题目
function getRandomQuestion(questions) {
  const index = Math.floor(Math.random() * questions.length)
  return questions[index]
}

export default defineEventHandler(async (event) => {
  // 读取 JSON 文件
  const questionsPath = path.join(process.cwd(), 'public', 'data', 'questions.json')
  const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'))
  
  // 获取查询参数
  const query = getQuery(event)
  const answeredQuestions = query.answered ? query.answered.split(',') : []

  try {
    // 过滤出未答过的题目
    const availableQuestions = questionsData.questions.filter(
      q => !answeredQuestions.includes(q.id)
    )

    // 如果没有可用题目,返回错误
    if (availableQuestions.length === 0) {
      return {
        success: false,
        error: 'No available questions'
      }
    }

    // 随机选择一道题目
    const selectedQuestion = getRandomQuestion(availableQuestions)

    // 移除答案信息,只返回题目内容
    const sanitizedQuestion = {
      id: selectedQuestion.id,
      category: selectedQuestion.category, 
      type: selectedQuestion.type,
      difficulty: selectedQuestion.difficulty,
      text: selectedQuestion.text,
      image: selectedQuestion.image,
      options: selectedQuestion.options
    }

    return {
      success: true,
      data: sanitizedQuestion
    }
  } catch (error) {
    console.log(error)
    return {
      success: false, 
      error: 'Failed to fetch question'
    }
  }
})