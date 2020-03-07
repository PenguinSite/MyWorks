import React, {useEffect, useState} from 'react'
import './QuizCreator.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import Select from '../../components/Ui/Select/Select'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'
import Loader from '../../components/Ui/Loader/Loader'
import {Field, reduxForm} from 'redux-form'
import {required} from "../../validators/validators";
import {NavLink} from "react-router-dom";

const QuizCreatorBefore = ({createQuizQuestion, finishCreateQuiz, ...props}) => {
    let [numberOfAnswers, setNumberOfAnswers] = useState(2)
    let [typeRequest, setTypeRequest] = useState(null)
    let [successAddTest, setSuccessAddTest] = useState(false)

    useEffect(() => {
        if (typeRequest === 'add' && props.data) {
            createQuizQuestion(props.data)
            props.destroy('quizCreator')
            setNumberOfAnswers(2)
        }
        if (typeRequest === 'create' && props.data) {
            finishCreateQuiz(props.data)
            props.destroy('quizCreator')
            setSuccessAddTest(true)
        }
        setTypeRequest(null)
    }, [props.data])

    function addAnswerHandler(e) {
        e.preventDefault()
        if (numberOfAnswers === 7) {return} // maximum number of answers
        setNumberOfAnswers(+numberOfAnswers + 1)
    }

    function deleteAnswerHandler(e) {
        e.preventDefault()
        if (numberOfAnswers === 2) {return} // minimum number of answers
        setNumberOfAnswers(+numberOfAnswers - 1)
        props.array.pop('Answer' + numberOfAnswers)
        props.array.pop('Answer' + numberOfAnswers)
    }

    function addQuestionHandler() {
        setTypeRequest('add')
    }

    function createQuizHandler() {
        setTypeRequest('create')
    }

    function renderInputAnswers() {
        let arrayWithAnswer = []
        for (let i = 1; i <= numberOfAnswers; i++) {
            arrayWithAnswer.push(i)
        }
        return arrayWithAnswer.map((item) => {
            return (
                <Field key={item} label={"Введите вариант ответа"} component={Input} name={"Answer" + item}
                       validate={required}/>
            )
        })
    }

    function renderOptionsSelect() {
        let arrayWithOption = []
        for (let i = 1; i <= numberOfAnswers; i++) {
            arrayWithOption.push(i)
        }
        return arrayWithOption.map((item) => {
            return (
                <option key={item} value={item}>{item}</option>
            )
        })
    }
    return (
        <div className='QuizCreator'>
            {!props.loading ?
                successAddTest !== true ?
            <div>
                <h1>Создайте тест</h1>

                    <form onSubmit={props.handleSubmit}>

                        <Field label={"Введите вопрос"} component={Input} name={"question"} validate={required}/>

                        {renderInputAnswers()}

                        <Field name={'rightAnswerId'} component={Select}>
                            {renderOptionsSelect()}
                        </Field>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            <Button type="primary" onClick={(e) => addAnswerHandler(e)}>
                                Добавить ответ
                            </Button>
                            <Button type="error" onClick={(e) => deleteAnswerHandler(e)}>
                                Удалить ответ
                            </Button>
                            <Button type="primary" onClick={addQuestionHandler}>
                                Добавить вопрос в тест
                            </Button>
                            <Button type="success" onClick={createQuizHandler}>
                                Создать тест
                            </Button>
                        </div>
                    </form>
            </div>
                    : <div>
                        <h1>Тест успешно загружен</h1>
                        <NavLink to={'/'}> <Button type={'primary'} extraClass={'button_go_to_test_list'}>Перейти к списку тестов</Button></NavLink>
                </div>
                : <Loader/>}
        </div>
    )
}

const QuizCreatorFormContainer = reduxForm({
    form: 'quizCreator'
})(QuizCreatorBefore)

const QuizCreator = (props) => {
    let [data, setData] = useState(null)
    const onSubmit = (formData) => {
        let newFormData = {}
        newFormData.answers = []
        for (let item in formData) {
            if (typeof formData[item] === 'string') {
            	switch(item) {
					case 'question':
						newFormData[item] = formData[item]
					case 'rightAnswerId':
						newFormData[item] = +formData[item]
					default:
						let id = item.slice(-1)
						newFormData.answers.push({id: id, text: formData[item]})
				}
            }
        }
        newFormData.id = props.quiz.length + 1
        if (!newFormData.rightAnswerId) {
            newFormData.rightAnswerId = 1
        }
        setData(newFormData)
    }
    return <QuizCreatorFormContainer onSubmit={onSubmit} deleteField={props.unregisterField} data={data} {...props}/>
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz,
        loading: state.create.loading
    }
}

export default connect(mapStateToProps, {createQuizQuestion, finishCreateQuiz})(QuizCreator)