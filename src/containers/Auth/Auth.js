import React from 'react'
import './Auth.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";
import {reduxForm, Field} from "redux-form";
import {NavLink} from "react-router-dom";
import {minLength8, required, validateEmail} from "../../validators/validators";

const AuthBefore = (props) => {
    return (
        <div className='Auth'>
            <div>
                <h1>Авторизация</h1>
                <form className="AuthForm" onSubmit={props.handleSubmit}>
                    <Field type={"text"} label={"email"} name={'email'} component={Input} validate={[required, validateEmail]}></Field>
                    <Field type={"password"} label={"password"} name={'password'} component={Input} validate={[required, minLength8]}></Field>
                    <div className={'formDescription'}>if you don’t have an account, you can create one <NavLink to={'/registration'}>here</NavLink></div>
                    <Button type="success">Войти</Button>
                </form>
            </div>
        </div>
    )
}

const AuthReduxForm = reduxForm({
    form: 'auth'
})(AuthBefore)

const Auth = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return <AuthReduxForm onSubmit={onSubmit}/>
}

export default connect(null, {auth})(Auth)