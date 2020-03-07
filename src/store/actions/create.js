import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, FETCH_QUIZES_START_TEST} from './actionTypes'
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		item
	}
}
export function resetQuizCreation() {
	return {
		type: RESET_QUIZ_CREATION
	}
}

export function fetchQuizesStartTest() {
	return {
		type: FETCH_QUIZES_START_TEST
	}
}
export function finishCreateQuiz(item) {
	return async (dispatch, getState) => {
		dispatch(fetchQuizesStartTest())
		dispatch(createQuizQuestion(item))
		await axios.post('quizes.json', getState().create.quiz)
		dispatch(resetQuizCreation())
	}
}