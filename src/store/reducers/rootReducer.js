import {combineReducers} from 'redux'
import quizReducer from './quiz'
import createReducer from './create'
import authReducer from "./auth";
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	quiz: quizReducer,
	create: createReducer,
	auth: authReducer,
	form: formReducer
})