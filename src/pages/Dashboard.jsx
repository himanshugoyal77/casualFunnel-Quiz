import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { Progress } from "antd";

const Dashboard = () => {
  // getting location state from previous page
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(userContext);
  // optionsHistory is the object containing all the options selected by the user
  const { optionsHistory } = userInfo;

  // array containing correct answers with index
  const correctAns = location.state.map((item) => item.correct_answer);

  // array containing user selected options with index
  const selectedAns = Object.values(optionsHistory);

  let correct = 0; //variable to store number of correct answers
  for (let i = 0; i < correctAns.length; i++) {
    if (correctAns[i] == selectedAns[i]) {
      correct++;
    }
  }

  // function to get suggestion based on score
  const getSuggestion = (score) => {
    if (score < 35) {
      return "You need to work hard";
    } else if (score > 35 && score < 60) {
      return "You can do better";
    } else if (score > 60 && score < 80) {
      return "You are doing good";
    } else if (score > 80 && score < 100) {
      return "You are doing great";
    } else if (score == 100) {
      return "You are a genius";
    }
  };

  return (
    <div className="result flex flex-col items-center">
      <div className="w-[80%] top flex flex-col md:flex-row items-center justify-around text-xl font-bold md:mt-12">
        <div className="user-info py-6 md:py-12">
          <h1 className="pb-3">Hi, {userInfo.username}</h1>
          <h2>{userInfo.email}</h2>
        </div>
        {/* score in percentage */}
        <div className="stats flex flex-col items-center gap-4 p-5">
          <Progress type="circle" percent={Math.round((correct / 15) * 100)} />
          <h2>{correct} / 15</h2>
        </div>
      </div>
      <div className="suggestion w-[80%] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-white bg-purple-500 px-8 py-2 rounded-md animate-pulse">
          {getSuggestion((correct / 15) * 100)}!
        </h1>
      </div>

      {/* questions and answers comparing side by side */}
      <div className="w-min md:w-full flex flex-col items-center mt-8 mb-4">
        {correctAns.map((item, i) => {
          return (
            <div
              key={i}
              className={
                "flex flex-col items-center gap-4 mt-2 md:px-4 border-b-2 py-4"
              }
            >
              <p className="flex gap-4 w-full ">
                <h1>{i + 1}.</h1>
                {location.state[i]?.question}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-2 px-4">
                <div
                  className={
                    "flex items-center justify-start gap-5 px-4 py-2 rounded-md text-white shadow-md" +
                    (correctAns[i] == selectedAns[i]
                      ? " bg-green-600"
                      : " bg-red-500")
                  }
                >
                  <p>
                    your answer :{" "}
                    {optionsHistory[i] ? optionsHistory[i] : "Not attempted"}
                  </p>
                </div>
                <h2 className="px-4 py-2 rounded-md bg-gray-400 text-white shadow-md">
                  correct ans : {item}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
      {/* try again button */}
      <button
        className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => {
          setUserInfo({
            ...userInfo,
            qIndex: 0,
            correctAns: 0,
            attempted: 0,
            optionsHistory: {},
          }),
            navigate("/", { replace: true });
          window.location.reload();
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default Dashboard;
