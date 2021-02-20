import React, { useEffect, useState } from "react";

const AnswerList = (props) => {
  let [typeAnswer, setTypeAnswer] = useState(null);
  let [WrongAnswerClass, setWrongAnswerClass] = useState("wrong_answer");
  const checkAnswer = (answerId) => {
    setTypeAnswer(answerId);
  };
  const removeClass = () => {
    setWrongAnswerClass("");
  };
  useEffect(() => {
    setWrongAnswerClass("wrong_answer");
  }, [WrongAnswerClass]);
  return (
    <div className="demo__elems">
      {props.answers.map((answer, index) => {
        return (
          <div className={"demo__elem demo__elem-" + (index + 1)} key={index}>
            {answer.text}
          </div>
        );
      })}
      {props.answers.map((answer, index) => {
        return (
          <span
            className={"demo__hover demo__hover-" + answer.id}
            onClick={() => {
              props.onAnswerClick(+answer.id);
              checkAnswer(+answer.id);
              removeClass();
            }}
            key={answer.id}
          ></span>
        );
      })}
      <div className="demo__highlighter">
        <div className="demo__elems">
          {props.answers.map((answer, index) => {
            return (
              <div className="demo__elem" key={index}>
                {answer.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="demo__examples">
        <p>
          {props.answerNumber} из {props.quizLength}
        </p>
        <div className="demo__examples-nb">
          <div className="nb-inner">
            {props.state != null ? (
              props.state[typeAnswer] === "error" ? (
                <div className={WrongAnswerClass}>Неправильно</div>
              ) : (
                <div className="right_answer">Верно</div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnswerList;
