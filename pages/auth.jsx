import axios from "axios";
import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useToast } from "@chakra-ui/react";

const initialInputValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

function Auth() {
  const toast = useToast();

  const showToast = (message, isSuccessful) => {
    toast({
      title: message,
      status: isSuccessful ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    await axios
      .post("api/create-user", {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      .then((res) => {
        // handle success
        console.log(res);
        showToast(res.data.message, true);
      })
      .catch((err) => {
        // handle error
        showToast(err.response.data.message, false);
      });
  };

  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const [isShowingLogin, setIsShowingLogin] = useState(true);
  const [values, setValues] = useState(initialInputValues);

  return isShowingLogin ? (
    <div className="flex flex-col items-center justify center min-h-screen py-2 bg-gray-100">
      <main className="sm:flex-row flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-100vh md:w-2/3 max-w-5xl">
          <div className="md:w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-blue-500">Company</span>
            </div>
            <div className="py-10 min-w-full">
              <h2 className="text-3xl font-bold text-blue-500">Sign in</h2>
              <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>

              <div className="flex flex-col item-center align-items">
                <div className="bg-gray-100 w-64 p-2 flex items-center mx-auto mb-3 rounded-lg">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mx-auto rounded-lg ">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm"
                  />
                </div>
              </div>
              <button
                onClick={() => console.log(values)}
                className="mt-5 border-2 border-blue-500 max-w-[500px] rounded px-12 py-2 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white duration-500"
              >
                Login
              </button>
            </div>
          </div>
          <div className="hidden md:block w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Create an Account!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p></p>
            <button
              onClick={() => setIsShowingLogin(false)}
              className="border-2 border-white rounded px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500 duration-500"
            >
              Sign Up
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsShowingLogin(false)}
          className="mt-5 text-blue-500 font-semibold md:hidden"
        >
          Create an Account
        </button>
      </main>
    </div>
  ) : (
    <div className="flex flex-col items-center justify center min-h-screen py-2 bg-gray-100">
      <main className="sm:flex-row flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-blue-500 rounded-2xl shadow-2xl flex w-100vh md:w-2/3 max-w-5xl">
          <div className="md:w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-white">Company</span>
            </div>
            <div className="py-10 min-w-full">
              <h2 className="text-3xl font-bold text-white">Sign up</h2>
              <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>

              <div className="flex flex-col item-center align-items">
                <div className="bg-gray-100 w-64 p-2 flex items-center mx-auto mb-3 rounded-lg">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mx-auto rounded-lg mb-3 ">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mx-auto mb-3 rounded-lg">
                  <IoPersonOutline className="text-gray-400 m-2" />
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleInputChange}
                    className="bg-gray-100 outline-none text-sm"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mx-auto mb-3 rounded-lg">
                  <IoPersonOutline className="text-gray-400 m-2" />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleInputChange}
                    className="bg-gray-100 outline-none text-sm"
                  />
                </div>
              </div>
              <button
                onClick={createNewUser}
                className="mt-5 border-2 border-white max-w-[500px] rounded px-12 py-2 text-white font-semibold hover:bg-white hover:text-blue-500 duration-500"
              >
                Create Account
              </button>
            </div>
          </div>
          <div className="hidden md:block w-2/5 bg-white text-blue-500 rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2 mt-10">
              Already have an account?
            </h2>
            <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
            <p></p>
            <button
              onClick={() => setIsShowingLogin(true)}
              className="border-2 border-blue-500 rounded px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white duration-500"
            >
              Log In
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsShowingLogin(true)}
          className="mt-5 text-blue-500 font-semibold md:hidden"
        >
          Already have an account?
        </button>
      </main>
    </div>
  );
}

export default Auth;
