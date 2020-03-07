import React from 'react'
import './Registration.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import {reduxForm, Field} from "redux-form";
import {NavLink} from "react-router-dom";
import {minLength8, required, validateEmail} from "../../validators/validators";

const RegistrationBefore = (props) => {
    return (
        <div className='Registration'>
            <div>
                <h1>Регистрация</h1>
                <form className="RegistrationForm" onSubmit={props.handleSubmit}>
                    <Field type={"text"} label={"first name"} name={'first_name'} component={Input} validate={required}></Field>
                    <Field type={"text"} label={"second_name"} name={'second_name'} component={Input} validate={required}></Field>
                    <Field type={"text"} label={"email"} name={'email'} component={Input} validate={[required, validateEmail]}></Field>
                    <Field type={"password"} label={"password"} name={'password'} component={Input} validate={[required, minLength8]}></Field>
                    <Field type={"password"} label={"repeat your password"} name={'password_repeat'} component={Input} validate={[required, minLength8]}></Field>
                    <div className={'formDescription'}>if you already have an account, you can log in <NavLink to={'/auth'}>here</NavLink></div>
                    <Button type="primary">Регистрация</Button>
                </form>
            </div>
        </div>
    )
}

const RegistrationReduxForm = reduxForm({
    form: 'registration'
})(RegistrationBefore)

const Registration = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return <RegistrationReduxForm onSubmit={onSubmit}/>
}
export default Registration