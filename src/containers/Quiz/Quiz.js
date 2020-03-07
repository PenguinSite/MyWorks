import React, {useEffect} from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/Ui/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

const Quiz = (props) => {
    useEffect(() => {
        props.fetchQuizById(props.match.params.id)
        return function retryQuiz() {
            props.retryQuiz()
        }
    }, [])
    return (
        <div className="Quiz">
            <div className={'QuizWrapper'}>
                <h1>Ответьте на вопросы</h1>
                {
                    props.loading || !props.quiz ? <Loader/> :
                        props.isFinished ? <FinishedQuiz
                                results={props.results}
                                quiz={props.quiz}
                                onRetry={props.retryQuiz}
                            /> :
                            <ActiveQuiz answers={props.quiz[props.activeQuestion].answers}
                                        question={props.quiz[props.activeQuestion].question}
                                        onAnswerClick={props.quizAnswerClick}
                                        quizLength={props.quiz.length}
                                        answerNumber={props.activeQuestion + 1}
                                        state={props.answerState}
                            />
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

export default connect(mapStateToProps, {fetchQuizById, quizAnswerClick, retryQuiz})(Quiz)