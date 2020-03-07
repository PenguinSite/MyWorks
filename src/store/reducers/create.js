import {
	CREATE_QUIZ_QUESTION,
	RESET_QUIZ_CREATION,
	FETCH_QUIZES_START_TEST
} from '../actions/actionTypes'

const initialState = {
	quiz: [],
	loading: false
}

export default function createReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_QUIZ_QUESTION:
			return {
				...state, quiz: [...state.quiz, action.item]
			}
		case RESET_QUIZ_CREATION:
			return	{
				...state, loading: false, quiz: []
			}
		case FETCH_QUIZES_START_TEST:
			return {
				...state, loading: true
			}
		default: 
			return state
	}
}