import React from "react";
import ReactDOM from "react-dom";
import Settings from "./mock/settings.js";
import questions from "./mocks/questions.js";
import App from "./components/app/app.jsx";

ReactDOM.render(
    <App
      errorsCount = {Settings.ERRORS_COUNT}
      questions = {questions}
    />,
    document.querySelector(`#root`)
);
