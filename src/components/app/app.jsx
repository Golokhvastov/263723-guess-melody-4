import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const welcomeButtonClickHandler = () => {};

const App = (props) => {
  const {errorsCount} = props;

  return (
    <WelcomeScreen
      errorsCount = {errorsCount}
      onWelcomeButtonClick = {welcomeButtonClickHandler}
    />
  );
};

export default App;

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};
