import React from "react";

const withUserAnswers = (Component) => {
  class WithUserAnswers extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        answers: [false, false, false, false],
      };
      this.answerChangeHandle = this.answerChangeHandle.bind(this);
      this.answerHandler = this.answerHandler.bind(this);
    }

    answerChangeHandle(newAnswer, i) {
      const {answers: userAnswers} = this.state;
      this.setState({
        answers: [...userAnswers.slice(0, i), newAnswer, ...userAnswers.slice(i + 1)],
      });
    }

    answerHandler() {
      const {question, onAnswer} = this.props;
      onAnswer(question, this.state.answers);
    }

    render() {
      return (
        <Component
          {...this.props}
          answers = {this.state.answers}
          onAnswerChange = {this.answerChangeHandle}
          onAnswer = {this.answerHandler}
        />
      );
    }
  }

  WithUserAnswers.propTypes = {};

  return WithUserAnswers;
};

export default withUserAnswers;
