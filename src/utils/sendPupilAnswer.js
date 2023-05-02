import { api } from "./api";

export async function sendPupilAnswer({testId, userId, answersIntoQuizzes}) {
  try {
    return await api.post(`/pupil-answer`, {
      testId,
      userId,
      answersIntoQuizzes,
    });
  } catch {console.log('EROOOORR ON SEND PUPIL ANSWERS');}
}
