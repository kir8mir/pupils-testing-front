import { api } from "./api";

export default async function createTest(testTitle, questionList, answerList) {
  try {
    const testId = await api.post(`/test`, {
      teacher: localStorage.getItem('userId'),
      title: testTitle,
    });
    questionList.forEach(async (question) => {
     const quizId = await api.post(`/quiz`, {
        test: +testId.data.raw.insertId,
        title: question.title,
      });

      answerList.forEach(async (answer) => {
        if (answer.questionId === question.id) {
          await api.post(`/answer`, {
            quiz: +quizId.data.id,
            title: answer.title,
            is_right: answer.isRight,
          });
        }
      });
    });
  } catch {}
}
