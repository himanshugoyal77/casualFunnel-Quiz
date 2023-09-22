import { Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import CountdownTimer from "../components/Counter";
import axios from "axios";
import Questions from "../components/Questions";
import Indicators from "../components/Indicators";

const HomePgae = () => {
  const [open, setOpen] = useState(false);
  const { userInfo, setUserInfo } = useContext(userContext);
  // questions is the array of all the questions fetched from the api
  const [questions, setQuestions] = useState([]);
  // qIndex is the index of the question that is currently being displayed, same in global state
  const { qIndex, optionsHistory } = userInfo;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // fetching questions from the api
  const getQuestions = async () => {
    try {
      const res = await axios.get("https://opentdb.com/api.php?amount=15");
      if (res.data.response_code == 0) {
        setQuestions(res.data.results);
      } else {
        console.log("somrthing went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // calling getQuestions() only once when the component mounts
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="h-screen w-screen home">
      {/* nav bar */}
      <nav
        className=" w-[90%] md:w-[80%] mx-auto flex items-center 
      justify-between text-lg font-bold text-blue-700 py-4"
      >
        <div className="hidden md:flex items-end text-black md:w-32">
          <span>Questions Attempted - </span>
          {userInfo?.attempted}
        </div>
        <CountdownTimer questions={questions} />
        <svg
          onClick={showDrawer}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 md:w-32 text-black cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </nav>
      {/* indicators */}
      <div className="flex justify-center gap-4 md:gap-12 mt-6">
        <Indicators color="bg-green-100" text="Easy" />
        <Indicators color="bg-yellow-300" text="Medium" />
        <Indicators color="bg-red-500" text="Hard" />
      </div>
      {/* questions component */}
      <Questions questions={questions} />
      {/* drawer */}
      <Drawer
        title="Questions Attempted"
        placement="right"
        onClose={onClose}
        open={open}
        style={{
          cursor: "pointer",
        }}
        className="cursor-pointer text-black"
      >
        {questions.map((question, i) => {
          return (
            <div
              onClick={() => {
                // setting the qIndex in global state to the index of the question that is clicked
                setUserInfo({ ...userInfo, qIndex: i });
                setOpen(false);
              }}
              key={i}
              className={
                "flex items-center gap-4 mt-2 px-4 py-2 rounded-md text-start text-sm" +
                (questions[i]?.difficulty == "easy"
                  ? " bg-green-100"
                  : questions[i]?.difficulty == "medium"
                  ? " bg-yellow-300"
                  : " bg-red-300")
              }
            >
              <h1>{i + 1}</h1>
              <h1>{question?.question.toString().substring(0, 40) + "..."}</h1>
              {optionsHistory[i] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <div className=""></div>
              )}
            </div>
          );
        })}
      </Drawer>
      <div className="h-12 md:hidden"></div>
    </div>
  );
};

export default HomePgae;
