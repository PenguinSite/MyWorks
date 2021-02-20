import React, { useState } from "react";
import "./QuizCreator.css";
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";
import Select from "../../components/Ui/Select/Select";
import { connect } from "react-redux";
import {
  createQuizQuestion,
  finishCreateQuiz,
} from "../../store/actions/create";
import Loader from "../../components/Ui/Loader/Loader";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";

const QuizCreator = ({ createQuizQuestion, finishCreateQuiz, ...props }) => {
  let [numberOfAnswers, setNumberOfAnswers] = useState(2);
  let [successAddTest, setSuccessAddTest] = useState(false);

  const initialValues = {
    question: "",
    Answer1: "",
    Answer2: "",
    Answer3: "",
    Answer4: "",
    Answer5: "",
    Answer6: "",
    Answer7: "",
  };

  const onSubmit = (values, resetForm, typeRequest) => {
    let newFormData = {};
    newFormData.answers = [];
    for (let item in values) {
      if (typeof values[item] === "string") {
        switch (item) {
          case "question":
            newFormData[item] = values[item];
            break;
          case "rightAnswerId":
            newFormData[item] = +values[item];
            break;
          default:
            let id = item.slice(-1);
            if (id <= numberOfAnswers) {
              newFormData.answers.push({ id: id, text: values[item] });
            }
        }
      }
    }
    newFormData.id = props.quiz.length + 1;
    if (!newFormData.rightAnswerId) {
      newFormData.rightAnswerId = 1;
    }
    resetForm(initialValues);
    if (typeRequest === "add") {
      createQuizQuestion(newFormData);
      setNumberOfAnswers(2);
    } else if (typeRequest === "create") {
      finishCreateQuiz(newFormData);
      setSuccessAddTest(true);
    }
  };

  function addAnswerHandler(e) {
    e.preventDefault();
    if (numberOfAnswers === 7) {
      return;
    } // maximum number of answers
    setNumberOfAnswers(+numberOfAnswers + 1);
  }

  function deleteAnswerHandler(e, setFieldValue) {
    e.preventDefault();
    if (numberOfAnswers === 2) {
      return;
    } // minimum number of answers
    setNumberOfAnswers(+numberOfAnswers - 1);
    setFieldValue("Answer" + numberOfAnswers, "");
  }

  function renderInputAnswers() {
    let arrayWithAnswer = [];
    for (let i = 1; i <= numberOfAnswers; i++) {
      arrayWithAnswer.push(i);
    }

    return arrayWithAnswer.map((item) => {
      return (
        <Field
          key={item}
          label={"Введите вариант ответа"}
          component={Input}
          name={"Answer" + item}
        />
      );
    });
  }

  function renderOptionsSelect() {
    let arrayWithOption = [];
    for (let i = 1; i <= numberOfAnswers; i++) {
      arrayWithOption.push(i);
    }
    return arrayWithOption.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  }
  return (
    <div className="QuizCreator">
      {!props.loading ? (
        successAddTest !== true ? (
          <div>
            <h1>Создайте тест</h1>
            <Formik initialValues={initialValues}>
              {({ values, resetForm, setFieldValue }) => (
                <Form className="AuthForm">
                  <Field
                    label={"Введите вопрос"}
                    name={"question"}
                    component={Input}
                  ></Field>
                  {renderInputAnswers()}
                  <Field name={"rightAnswerId"} component={Select}>
                    {renderOptionsSelect()}
                  </Field>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Button
                      uiType="primary"
                      type={"button"}
                      onClick={(e) => addAnswerHandler(e)}
                    >
                      Добавить ответ
                    </Button>
                    <Button
                      uiType="error"
                      type={"button"}
                      onClick={(e) => deleteAnswerHandler(e, setFieldValue)}
                    >
                      Удалить ответ
                    </Button>
                    <Button
                      uiType={"primary"}
                      type={"button"}
                      onClick={() => onSubmit(values, resetForm, "add")}
                    >
                      Добавить вопрос в тест
                    </Button>
                    <Button
                      uiType="success"
                      type={"button"}
                      onClick={() => onSubmit(values, resetForm, "create")}
                    >
                      Создать тест
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div>
            <h1>Тест успешно загружен</h1>
            <NavLink to={"/"}>
              {" "}
              <Button type={"primary"} extraClass={"button_go_to_test_list"}>
                Перейти к списку тестов
              </Button>
            </NavLink>
          </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
    loading: state.create.loading,
  };
}

export default connect(mapStateToProps, {
  createQuizQuestion,
  finishCreateQuiz,
})(QuizCreator);
