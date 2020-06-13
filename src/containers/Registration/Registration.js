import React from 'react'
import './Registration.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import { Formik, Form, Field } from 'formik';
import {NavLink} from "react-router-dom";

const Registration = () => {
    return (
        <div className='Registration'>
            <div>
                <h1>Регистрация</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="AuthForm">
                            <Field type={"text"} label={"first name"} name={'first_name'} component={Input}></Field>
                            <Field type={"text"} label={"second_name"} name={'second_name'} component={Input}></Field>
                            <Field type={"email"} label={"email"} name={'email'} component={Input}></Field>
                            <Field type={"password"} label={"password"} name={'password'} component={Input}></Field>
                            <Field type={"password"} label={"repeat your password"} name={'password_repeat'} component={Input}></Field>
                            <div className={'formDescription'}>if you already have an account, you can log in <NavLink to={'/auth'}>here</NavLink></div>
                            <Button uiType="primary" type={"submit"} disabled={isSubmitting}>Регистрация</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Registration
