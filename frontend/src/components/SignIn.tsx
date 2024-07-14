import React from "react";
import upperIcon from "../images/upperIcon.png";
import { Button, Form, Input, message } from "antd";
import RightArrowIcon from "../icons/RightArrowIcon";
import UserNameIcon from "../icons/UserNameIcon";
import PasswordIcon from "../icons/PasswordIcon";
import { useHistory } from "react-router";
import { loginUser } from "../services/apiService";
import { NoticeType } from "antd/es/message/interface";
   

const SignIn: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();

  const moveToHomePage = () => {
    history.push("/home");
  };

  const moveToSignUp = () => {
    history.push("/signup");
  };

  const msgNotify = (messageType: NoticeType, content: string) => {
    messageApi.open({
      type: messageType,
      content: content,   
    });    
  }; 

  const loginUserFunc = async (values: any) => {
    console.log("payload for loginUser api :- ", values);
    try {
      const response = await loginUser(values);

      // Set the user id in localStorage
      if (response?.userId) {
        localStorage.setItem("userId", response.userId);
      }   
   
      msgNotify("success", response.message)   
      moveToHomePage();        
     
    } catch (error: any) {     
      console.error("login user api response:- ", error.message);

      msgNotify("error", error.message)   
    }
  };
     
  return (
    <>
    {contextHolder}
    <div className="bg-white text-black h-screen">
      <img className="w-full max-h-24" src={upperIcon} alt="-" />

      <div className="mx-8">
        <p className="mt-4 text-center font-bold text-2xl">
          Welcome to VibeFlow
        </p>
        <p className="mt-4 font-medium cursor-pointer text-xs text-center hover:underline">
          Sign in to your account
        </p>
        <Form
          name="signin"
          initialValues={{ remember: true }}
          onFinish={loginUserFunc}   
        >
          <div className="mt-16 space-y-8">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long",
                },
              ]}
            >
              <Input
                className="rounded-full border-1 px-4 py-3 shadow-lg"
                placeholder="Username"
                prefix={<UserNameIcon width="16px" height="16px" />}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password  
                className="rounded-full border-1 px-4 py-3 shadow-lg"
                placeholder="Password"
                prefix={<PasswordIcon width="16px" height="16px" />}
              />
            </Form.Item>
          </div>
          <p className="mt-8 font-semibold cursor-pointer text-xs text-right underline">
            Forgot your password?
          </p>
          <div className="mt-8 flex items-start justify-center space-x-3">
            <p className="font-semibold text-xl">Sign in</p>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="px-4 py-2 rounded-full cursor-pointer bg-gradient-to-r from-[#F97794] to-[#623AA2]"
              >
                <RightArrowIcon width="16px" height="16px" />
              </Button>
            </Form.Item>
          </div>    
        </Form>
        <p className="mt-4 cursor-pointer text-xs text-center ">
          Don't have an account?{" "}
          <span onClick={moveToSignUp} className="underline">
            Create
          </span>
        </p>
      </div>
    </div>
    </>    
  );
};

export default SignIn;
