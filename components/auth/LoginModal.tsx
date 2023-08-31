import React, { useState, useEffect } from "react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { useRouter } from "next/router";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loginUser } from "@/slices/authSlice";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleOpenRegisterModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  handleOpenRegisterModal,
}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (auth.loginStatus === "success") {
      onClose();
      router.push("/forum");
    }
  }, [auth.loginStatus, router, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDontHaveAccount = () => {
    onClose();
    setUserData({
      email: "",
      password: "",
    });
    setTimeout(() => {
      handleOpenRegisterModal();
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser(userData));
    setUserData({
      email: "",
      password: "",
    });
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 w-full ease-in duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        style={{
          backgroundImage: 'url("/background2.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="bg-white rounded-lg p-3 shadow-lg"
      >
        <h2 className="flex justify-center items-center text-md text-white font-medium">
          Your Details For Login
        </h2>
        <div className="flex space-x-2 italic mt-6 text-yellow-200">
          <h4 className="font-medium text-sm">{"Don't have an account?"}</h4>
          <button
            onClick={handleDontHaveAccount}
            className="flex text-sm text-black py-1 px-2 -mt-1 w-30 bg-white w-30 h rounded-lg "
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {auth.loginStatus === "rejected" ? (
            <p className="flex text-sm text-center text-red-500 mt-3 justify-center items-center m-auto mb-3 italic ">
              {auth.loginError}
            </p>
          ) : null}
          <Input
            htmlFor="Email"
            name="email"
            value={userData.email}
            placeholder="Enter Your email"
            type="text"
            onChange={handleChange}
            text="Email"
            required
          />
          <Input
            htmlFor="Password"
            name="password"
            value={userData.password}
            placeholder="Enter Your password"
            type="password"
            onChange={handleChange}
            text="Password"
            required
          />
          <div className="flex justify-end mt-2">
            <div
              onClick={onClose}
              className="text-yellow-200 font-medium hover:underline mr-4 cursor-pointer mt-2"
            >
              Close
            </div>
            <Button
              disabled={auth.loginStatus === "pending"}
              type="submit"
              text={auth.loginStatus === "pending" ? "Submitting..." : "Login"}
              onClick={() => {}}
              style="bg-blue-700 text-white rounded px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
