import React, { useState } from "react";
import upperIcon from "../images/upperIcon.png";
import { Button, Form, Input, message } from "antd";
import RightArrowIcon from "../icons/RightArrowIcon";
import UserNameIcon from "../icons/UserNameIcon";
import PasswordIcon from "../icons/PasswordIcon";
import { useHistory } from "react-router";
import { loginUser } from "../services/apiService";
import { NoticeType } from "antd/es/message/interface";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../services/storageService";

const SignIn: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
 
  const navigate = useNavigate();

  const msgNotify = (messageType: NoticeType, content: string) => {
    messageApi.open({
      type: messageType,
      content: content,   
    });    
  }; 

  const loginUserFunc = async () => {
    
    // Validate all required fields
    if (!username || !password) {
      msgNotify("error", "All fields are required!");
      return;
    }

    const loginpayload = {
      "username": username.trim(),
      "password": password.trim()
    }

    console.log("login user api payload:- ", loginpayload)

    try {
      const response = await loginUser(loginpayload);

      console.log("login user func response", response)

      await setItem("userId", response?.mongodoc._id);
   
      msgNotify("success", response.message)   
      navigate("/home")       
     
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
                onChange={(e) => {setUsername(e.target.value)}}
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
                autoComplete="off"
                onChange={(e) => {setPassword(e.target.value)}}
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
                onClick={() => {loginUserFunc()}}
              >
                <RightArrowIcon width="16px" height="16px" />
              </Button>
            </Form.Item>
          </div>    
        </Form>
        <p className="mt-4 cursor-pointer text-xs text-center ">
          Don't have an account?{" "}
          <span onClick={() => {navigate("/signup")}} className="underline">
            Create
          </span>
        </p>
      </div>
    </div>
    </>    
  );
};

export default SignIn;
