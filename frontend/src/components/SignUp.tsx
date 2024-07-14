// src/components/SignUp.tsx
import React from "react";
import { Form, Input, Button, message } from "antd";
import UserNameIcon from "../icons/UserNameIcon";
import PasswordIcon from "../icons/PasswordIcon";
import EmailIcon from "../icons/EmailIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import FaceBookIcon from "../icons/FacebookIcon";
import TwitterIcon from "../icons/TwitterIcon";
import GoogleIcon from "../icons/GoogleIcon";
import upperIcon from "../images/upperIcon.png";
import MobileIcon from "../icons/MobileIcon";
import { useHistory } from "react-router";
import { registerUser } from "../services/apiService";
import { NoticeType } from "antd/es/message/interface";

const SignUp: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();

  const moveToHomePage = () => {
    history.push("/home");
  };

  const moveToSignIn = () => {
    history.push('/signin');   
  };    

  const msgNotify = (messageType: NoticeType, content: string) => {
    messageApi.open({
      type: messageType,
      content: content,   
    });    
  }; 

  const registerNewUser = async (values: any) => {
    console.log("payload for registerNewUser:- ", values);
    try {
      const response = await registerUser(values);
      console.log("register new user api response:- ", response);
      console.log("user id:- ", response?.userId);

      // Set the user id in localStorage
      if (response?.userId) {
        localStorage.setItem("userId", response.userId);
      }

      msgNotify("success", response.message)
   
      moveToHomePage();  
    } catch (error: any) {
      console.error("register new user api response:- ", error.message);

      msgNotify("error", error.message)   
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      {contextHolder}
      <div className="bg-white text-black h-screen">
        <img className="w-full max-h-24" src={upperIcon} alt="-" />
        <div className="mx-8">
          <p className="mt-4 font-semibold text-2xl">Create account</p>
          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={registerNewUser}
          >
            <div className="mt-4 space-y-8">
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
                  autoComplete="off"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input
                  className="rounded-full border-1 px-4 py-3 shadow-lg"
                  placeholder="Email"
                  type="email"
                  prefix={<EmailIcon width="14px" height="14px" />}
                  autoComplete="off"
                />
              </Form.Item>

              <Form.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                ]}
              >
                <Input
                  className="rounded-full border-1 px-4 py-3 shadow-lg"
                  placeholder="Mobile"
                  type="tel"
                  prefix={<MobileIcon width="14px" height="14px" />}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                />
              </Form.Item>   
            </div>
            <p className="mt-4 font-semibold cursor-pointer text-xs text-right underline" onClick={ ()=> moveToSignIn()} >Sign in to your account</p>   
            <div className="mt-4 h-fit flex items-start justify-center space-x-3">
              <p className="font-semibold text-xl">Create</p>       
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
          <p className="cursor-pointer text-xs text-center">
            Or create account using social media
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-3">
            <FaceBookIcon width="35px" height="35px" />
            <TwitterIcon width="35px" height="35px" />
            <GoogleIcon width="35px" height="35px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
