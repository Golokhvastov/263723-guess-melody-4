import React from "react";
import PropTypes from "prop-types";

const Mistakes = (props) => {
  const {mistakes, maxMistakes} = props;

  const maxMistakesArray = new Array(maxMistakes).fill(``);

  return (
    <div className="game__mistakes">
      {maxMistakesArray.map((emptyElement, i) => {
        return (
          <div className={i < mistakes ? `wrong` : `correct`} key={`mistake-${i}`}></div>
        );
      })}
    </div>
  );
};

export default Mistakes;

Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
};
