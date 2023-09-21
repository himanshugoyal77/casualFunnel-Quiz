import { Button, Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import CountdownTimer from "../components/Counter";
import axios from "axios";
import Questions from "../components/Questions";
import bgAnimation from "../assets/animation_lmt99qiw.json";
import Lottie from "lottie-react";
import Indicators from "../components/Indicators";

const HomePgae = () => {
  const [open, setOpen] = useState(false);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const { username } = userInfo;
  const { qIndex, optionsHistory } = userInfo;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getQuestions = async () => {
    const res = await axios.get("https://opentdb.com/api.php?amount=15");
    if (res.data.response_code == 0) {
      setQuestions(res.data.results);
      console.log(questions);
    } else {
      console.log("somrthing went wrong!");
    }
  };

  useEffect(() => {
    getQuestions();
  }, [username]);
  console.log("QQQidx1", qIndex);
  return (
    <div className="h-screen w-screen home">
      <nav
        className=" w-[90%] md:w-[80%] mx-auto flex items-center 
      justify-between text-lg font-bold text-blue-700 py-4"
      >
        <div className="hidden md:flex items-end text-black md:w-32">
          <span>Questions Attempted - </span>
          {userInfo.attempted}
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
      <div className="flex justify-center gap-4 md:gap-12 mt-6">
        <Indicators color="bg-green-100" text="Easy" />
        <Indicators color="bg-yellow-300" text="Medium" />
        <Indicators color="bg-red-500" text="Hard" />
      </div>
      <Questions questions={questions} idx={idx} />
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
              onClick={() => setUserInfo({ ...userInfo, qIndex: i })}
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
