import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`e2e test WelcomeScreen`, () => {
  const onWelcomeButtonClick = jest.fn();
  const welcomeScreen = shallow(<WelcomeScreen
    errorsCount = {4}
    onWelcomeButtonClick = {onWelcomeButtonClick}
  />);

  // expect(welcomeScreen.find(`.welcome__rules-list`).find(`li`).at(1).text()).toEqual(`Можно допустить 4 ошибки.`);
  // const welcomeLi = welcomeScreen.find(`.welcome__rules-list`);
  // console.log(welcomeLi.props().children[1].props.children[1]);

  const welcomeButton = welcomeScreen.find(`.welcome__button`);
  // welcomeButton.props().onClick();
  welcomeButton.simulate(`click`);

  // expect(onWelcomeButtonClick).toHaveBeenCalledTimes(1);
  expect(onWelcomeButtonClick.mock.calls.length).toBe(1);
  // console.log(onWelcomeButtonClick.mock);
});
