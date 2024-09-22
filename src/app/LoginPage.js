import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [toggle, setToggle] = useState(false);
  const [errorNum, setErrorNum] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const cnfPassword = useRef(null);
  const lEmail = useRef(null);
  const lPassword = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/registerForm");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignin = async () => {
    const url = "http://localhost:5000/formauth/signin";
    const method = "POST";
    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify({
          email: lEmail.current.value,
          password: lPassword.current.value,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (res.status !== 200) {
        const error = new Error(resData.message);
        error.statusCode = res.status;
        throw error;
      }
      localStorage.setItem("userId", resData.userId);
      navigate("/registerForm");
      return resData;
    } catch (error) {
      if (!error.statuscode) {
        error.statuscode = 500;
      }
      toast.error(error.message, {
        position: "top-center",
        autoClose: 7000,
      });
    }
  };

  const handleSignup = async () => {
    const url = "http://localhost:5000/formauth/signup";
    const method = "PUT";
    if (name.current.value.length < 4) {
      setErrorNum(1);
      toast.warn("Invalid Data!!", {
        position: "top-center",
        autoClose: 7000,
      });
      return;
    }
    if (!email.current.value.length > 0) {
      setErrorNum(2);
      toast.warn("Invalid Data!!", {
        position: "top-center",
        autoClose: 7000,
      });
      return;
    }
    if (!password.current.value.length > 0) {
      setErrorNum(3);
      toast.warn("Invalid Data!!", {
        position: "top-center",
        autoClose: 7000,
      });
      return;
    }
    if (password.current.value !== cnfPassword.current.value) {
      toast.warn("Passwords matching failed!!", {
        position: "top-center",
        autoClose: 7000,
      });
      return;
    }
    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify({
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (res.status !== 201) {
        const error = new Error(resData.message);
        error.data = resData?.data;
        error.statusCode = res.status;
        throw error;
      }
      localStorage.setItem("userId", resData.userId);
      navigate("/registerForm");
      return resData;
    } catch (error) {
      if (!error.statuscode) {
        error.statuscode = 500;
      }
      toast.error(
        <div>
          <p>{error.message}</p>
          <p>{error?.data[0]?.msg}</p>
        </div>,
        {
          position: "top-center",
          autoClose: 7000,
        }
      );
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className={`${toggle ? "hidden" : ""}`}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign In to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={(e) => e.preventDefault()}
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    ref={lEmail}
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    ref={lPassword}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSignin}
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <button
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setToggle(true)}
              >
                Sing Up
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className={`${toggle ? "" : "hidden"}`}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    ref={name}
                    type="text"
                    autoComplete="given-name"
                    className={`block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${
                      errorNum === 1 ? "ring-red-600" : ""
                    }`}
                  />
                </div>
                {errorNum === 1 ? (
                  <p className="text-sm text-red-500">
                    Enter the proper name value!!
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    ref={email}
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
                {errorNum === 2 ? (
                  <p className="text-sm text-red-500">
                    Enter the proper email value!!
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    ref={password}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
                {errorNum === 3 ? (
                  <p className="text-sm text-red-500">
                    Please enter the password length of atleast 7 or grater with
                    one or more special character and numbers
                  </p>
                ) : (
                  <p>
                    Please enter the password length of atleast 7 or grater with
                    one or more special character and numbers
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cnfPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm-Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="cnfPassword"
                    ref={cnfPassword}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?
              <button
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setToggle(false)}
              >
                Sing In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
