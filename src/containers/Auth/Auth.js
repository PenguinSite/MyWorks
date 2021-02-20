import React from "react";
import "./Auth.css";
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Auth = () => {
  return (
    <div className="Auth">
      <div>
        <h1>Авторизация</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
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
              <Field
                type={"email"}
                label={"email"}
                name={"email"}
                component={Input}
              ></Field>
              <Field
                type={"password"}
                label={"password"}
                name={"password"}
                component={Input}
              ></Field>
              <div className={"formDescription"}>
                if you don’t have an account, you can create one{" "}
                <NavLink to={"/registration"}>here</NavLink>
              </div>
              <Button uiType="success" type={"submit"} disabled={isSubmitting}>
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default connect(null, { auth })(Auth);
