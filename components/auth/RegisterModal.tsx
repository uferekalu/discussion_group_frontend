import React, { useState, useEffect } from "react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { useRouter } from "next/router";
import { registerUser } from "@/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleOpenLoginModal: () => void;
}

const RegisterModal = (props: RegisterModalProps) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    country: "",
    sex: "",
    hobbies: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { handleOpenLoginModal, onClose } = props;

  useEffect(() => {
    if (auth.registerStatus === "success") {
      handleOpenLoginModal();
      onClose();
    }
  }, [auth.registerStatus, handleOpenLoginModal, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAlreadyHaveAccount = () => {
    props.onClose();
    setUserData({
      name: "",
      email: "",
      username: "",
      password: "",
      country: "",
      sex: "",
      hobbies: "",
    });
    setTimeout(() => {
      props.handleOpenLoginModal();
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerUser(userData));
    setUserData({
      name: "",
      email: "",
      username: "",
      password: "",
      country: "",
      sex: "",
      hobbies: "",
    });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 w-full ease-in duration-300 ${
        props.isOpen ? "visible" : "invisible"
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
          Your Details For Registration
        </h2>
        <div className="flex space-x-2 italic mt-6 text-yellow-200">
          <h4 className="font-medium text-sm">Already have an account? </h4>
          <button
            onClick={handleAlreadyHaveAccount}
            className="flex text-sm text-black py-1 px-2 -mt-1 w-30 bg-white w-30 h rounded-lg "
          >
            Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {auth.registerStatus === "rejected" ? (
            <p className="flex text-sm text-center text-red-500 mt-3 justify-center items-center m-auto mb-3 italic ">
              {auth.registerError}
            </p>
          ) : null}
          <Input
            htmlFor="Name"
            name="name"
            value={userData.name}
            placeholder="Enter Your name"
            type="text"
            onChange={handleChange}
            text="Name"
            required
          />
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
            htmlFor="Username"
            name="username"
            value={userData.username}
            placeholder="Enter Your username"
            type="text"
            onChange={handleChange}
            text="Username"
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
          <Input
            htmlFor="Country"
            name="country"
            value={userData.country}
            placeholder="Enter Your country"
            type="text"
            onChange={handleChange}
            text="Country"
            required
          />
          <Input
            htmlFor="Sex"
            name="sex"
            value={userData.sex}
            placeholder="Enter Your sex"
            type="text"
            onChange={handleChange}
            text="Sex"
            required
          />
          <Input
            htmlFor="Hobbies"
            name="hobbies"
            value={userData.hobbies}
            placeholder="Enter Your hobbies"
            type="text"
            onChange={handleChange}
            text="Hobbies"
            required
          />
          <div className="flex justify-end mt-2">
            <div
              onClick={props.onClose}
              className="text-yellow-200 font-medium hover:underline mr-4 cursor-pointer mt-2"
            >
              Close
            </div>
            <Button
              disabled={auth.registerStatus === "pending"}
              type="submit"
              text={
                auth.registerStatus === "pending" ? "Submitting..." : "Register"
              }
              onClick={() => {}}
              style="bg-blue-700 text-white rounded px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
