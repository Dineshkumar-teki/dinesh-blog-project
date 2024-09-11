import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import signInImage from "../assets/signInImage.png";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errMsg } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className="min-h-[90vh] my-10 md:my-0 flex justify-center flex-col md:flex-row items-center">
      <div className="w-[100%] md:w-[50%] flex justify-center mb-10 md:mb-0">
        <Link
          to="/"
          className="whitespace-nowrap text-4xl font-bold dark:text-white self-center md:hidden"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
            Dinesh's
          </span>
          Blog
        </Link>
        <Link
          to="/"
          className="whitespace-nowrap text-4xl font-bold dark:text-white self-center max-sm:hidden md:block"
        >
          <img src={signInImage} alt="signInImage" className="w-full " />
        </Link>
      </div>
      <div className="w-[100%] md:w-[50%] flex flex-col justify-center items-center md:items-start">
        <form
          className="flex flex-col gap-4 w-[90%] lg:w-[60%]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <Label>Your Email</Label>
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Your Password</Label>
            <TextInput
              type="password"
              placeholder="************"
              id="password"
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-3">
          <span>Don't have an account?</span>
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </div>
        {errMsg && (
          <Alert className="mt-4 w-[90%] lg:w-[60%]" color="failure">
            {errMsg}
          </Alert>
        )}
      </div>
    </section>
  );
};

export default SignIn;
