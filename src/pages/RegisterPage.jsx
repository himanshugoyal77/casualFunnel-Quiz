import { useContext, useState } from "react";
import Lottie from "lottie-react";
import userAnimation from "../assets/animation_lmrvbep8.json";
import userContext from "../context/userContext";
import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { setUserInfo } = useContext(userContext);

  const navigate = useNavigate();

  // setting user info in global context
  const handleClick = () => {
    setUserInfo({
      username,
      email,
      correctAns: 0,
      attempted: 0,
      qIndex: 0,
      optionsHistory: {},
    });
    // checking if user has entered valid email and username
    if (username == "" || email == "" || !email.includes("@")) {
      messageApi.info("Please enter a valid email and username!");
    } else {
      // if valid email and username then show CONFIRMATION show modal
      showModal();
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  // once user clicks confirm button then navigate to home page
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    navigate("/home");
  };

  // if user clicks cancel button then close the modal
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div
      data-testid="register-page"
      className=" h-screen w-screen flex flex-col md:flex-row items-center justify-center"
    >
      {contextHolder}
      {/* left animation */}
      <Lottie
        className="h-1/2 md:h-full"
        animationData={userAnimation}
        loop={true}
      />
      {/* right form */}
      <div
        className="md:w-1/3
      flex flex-col items-end justify-center
       border rounded-md px-6 py-8 shadow-md bg-white"
      >
        <div className="w-full flex flex-col items-start">
          <h1 className="font-bold text-2xl mx-auto">CasualFunnel QUIZ</h1>
          {/* user name input */}
          <label htmlFor="name" className="mt-4">
            User Name
          </label>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            name="username"
            className="outline-none border border-blue-400
          focus:border-blue-600
           rounded-md px-4 py-2 mt-1 w-full"
          />
        </div>
        <div className="w-full flex flex-col items-start mt-5">
          {/* email input */}
          <label htmlFor="name">Email</label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            className="outline-none border border-blue-400
          focus:border-blue-600
           rounded-md px-4 py-2 mt-1 w-full"
          />
        </div>
        <button
          onClick={handleClick}
          className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 w-[120px]
        hover:text-white font-bold py-2 px-4 rounded-md mt-8
        transition duration-300 ease-in-out hover:scale-95
        "
        >
          Start
        </button>
      </div>
      {/* confirmation modal */}
      <Modal
        okText="Confirm"
        title="Welcome to CasualFunnel Quiz"
        okType="info"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: "30%", height: "fit-content", color: "gray" }}
      >
        <p>
          Your Timer will start once you click{" "}
          <span className="text-red-700 font-bold">CONFIRM</span>
        </p>
      </Modal>
    </div>
  );
};

export default Register;
