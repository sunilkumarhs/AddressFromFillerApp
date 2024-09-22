import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [errorNum, setErrorNum] = useState(null);
  const navigate = useNavigate();
  const address = useRef(null);
  const city = useRef(null);
  const country = useRef(null);
  const state = useRef(null);
  const pinCode = useRef(null);
  const phoneNumber = useRef(null);
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleCancle = async () => {
    address.current.value = null;
    city.current.value = null;
    state.current.value = null;
    pinCode.current.value = null;
    phoneNumber.current.value = null;
    setErrorNum(null);
  };
  const handleRegister = async () => {
    if (address.current.value.length < 5) {
      setErrorNum(3);
      toast.warn("Invalid Data!!");
      return;
    } else if (city.current.value.length < 4) {
      setErrorNum(4);
      toast.warn("Invalid Data!!");
      return;
    } else if (state.current.value.length < 4) {
      setErrorNum(5);
      toast.warn("Invalid Data!!");
      return;
    } else if (pinCode.current.value.length !== 6) {
      setErrorNum(6);
      toast.warn("Invalid Data!!");
      return;
    } else if (phoneNumber.current.value.length !== 10) {
      setErrorNum(7);
      toast.warn("Invalid Data!!");
      return;
    }
    try {
      const url = "http://localhost:5000/formregister/register";
      const method = "PUT";
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          address: address.current.value,
          country: country.current.value,
          city: city.current.value,
          state: state.current.value,
          pincode: pinCode.current.value,
          phonenumber: phoneNumber.current.value,
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
      address.current.value = null;
      city.current.value = null;
      state.current.value = null;
      pinCode.current.value = null;
      phoneNumber.current.value = null;
      setErrorNum(null);
      toast.success(resData.message, {
        position: "top-center",
        autoClose: 7000,
      });
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
      <form className="p-10" onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-end">
          <button
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleSignOut}
          >
            Sign-Out
          </button>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive post.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  ref={country}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6"
                >
                  <option>India</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  ref={address}
                  type="text"
                  autoComplete="street-address"
                  className={`block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${
                    errorNum === 3 ? "ring-red-600" : ""
                  }`}
                />
              </div>
              {errorNum === 3 ? (
                <p className="text-sm text-red-500">
                  Enter the proper address value!!
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  ref={city}
                  type="text"
                  autoComplete="address-level2"
                  className={`block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${
                    errorNum === 4 ? "ring-red-600" : ""
                  }`}
                />
              </div>
              {errorNum === 4 ? (
                <p className="text-sm text-red-500">
                  Enter the proper city value!!
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  ref={state}
                  type="text"
                  autoComplete="address-level1"
                  className={`block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${
                    errorNum === 5 ? "ring-red-600" : ""
                  }`}
                />
              </div>
              {errorNum === 5 ? (
                <p className="text-sm text-red-500">
                  Enter the proper state value!!
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  ref={pinCode}
                  type="number"
                  autoComplete="postal-code"
                  className={`block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${
                    errorNum === 6 ? "ring-red-600" : ""
                  }`}
                />
              </div>
              {errorNum === 6 ? (
                <p className="text-sm text-red-500">
                  Enter the proper pin-code value!!
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phonenumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                PhoneNumber
              </label>
              <div className="mt-2">
                <input
                  id="phonenumber"
                  ref={phoneNumber}
                  type="number"
                  autoComplete="phonenumber"
                  className={`block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 ${
                    errorNum === 7 ? "ring-red-600" : ""
                  }`}
                />
              </div>
              {errorNum === 7 ? (
                <p className="text-sm text-red-500">
                  Enter the proper phone-number value!!
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCancle}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
