import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import MainComponent from "./components/MainComponent";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

Enzyme.configure({ adapter: new Adapter() });
