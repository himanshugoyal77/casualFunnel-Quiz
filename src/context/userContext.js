import { createContext } from "react";

// global state to store user info
const userContext = createContext({
  username: "",
  email: "",
  correctAns: 0, // number of correct answers
  attempted: 0, // number of questions attempted
  qIndex: 0, // index of the question that is currently being displayed
  optionsHistory: {}, // object to store the options selected by the user
});

export default userContext;
