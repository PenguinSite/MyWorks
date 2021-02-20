import React from "react";
import "./FinishedQuiz.css";
import { Link } from "react-router-dom";
import Button from "../Ui/Button/Button";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={"FinishedQuiz"}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            "fa",
            props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
          ];
          return (
            <li key={index}>
              <strong>{index + 1 + ". "} </strong>
              {quizItem.question}
              <i className={cls.join(" ")}></i>
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} uiType={"primary"}>
          Повторить
        </Button>
        <Link to={"/"}>
          <Button uiType={"success"}>Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
