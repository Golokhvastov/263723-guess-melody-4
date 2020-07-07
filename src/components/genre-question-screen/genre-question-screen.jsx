import React from "react";
import PropTypes from "prop-types";

const GenreQuestionScreen = (props) => {
  const {question, renderPlayer, onAnswerChange, onAnswer} = props;
  const {answers: userAnswers} = props;
  const {answers} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите инди-рок треки</h2>
      <form
        className="game__tracks"
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer();
        }}
      >
        {answers.map((answer, i) => {
          return (
            <div className="track" key={answer.src + i}>
              {renderPlayer(answer.src, i)}
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                  id={`answer-${i}`}
                  checked={userAnswers[i]}
                  onChange={(evt) => {
                    const value = evt.target.checked;
                    onAnswerChange(value, i);
                  }}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          );
        })}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

export default GenreQuestionScreen;

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
        })
    ).isRequired
  }).isRequired,
  answers: PropTypes.array.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};
