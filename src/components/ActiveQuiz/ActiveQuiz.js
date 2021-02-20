import React from "react";
import "./ActiveQuiz.scss";
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = (props) => {
  return (
    <div
      className="demo"
      style={{ height: 29 + props.answers.length * 7 + "rem" }}
    >
      <div className="demo__content">
        <h2 className="demo__heading">
          {props.answerNumber + ". "}
          {props.question}{" "}
        </h2>

        <AnswerList
          answers={props.answers}
          onAnswerClick={props.onAnswerClick}
          state={props.state}
          quizLength={props.quizLength}
          answerNumber={props.answerNumber}
        />
      </div>
    </div>
  );
};

export default ActiveQuiz;
