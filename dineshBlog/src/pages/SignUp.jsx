import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrMsg("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrMsg(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrMsg(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setErrMsg(error.message);
    }
  };

  return (
    <section className="min-h-[90vh] my-10 md:my-0 flex justify-center flex-col md:flex-row items-center">
      <div className="w-[100%] md:w-[50%] flex justify-center mb-10 md:mb-0">
        <Link
          to="/"
          className="whitespace-nowrap text-4xl font-bold dark:text-white self-center"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Dinesh's
          </span>
          Blog
        </Link>
      </div>
      <div className="w-[100%] md:w-[50%] flex flex-col justify-center items-center md:items-start">
        <form
          className="flex flex-col gap-4 w-[90%] lg:w-[60%]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <Label>Your username</Label>
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </div>
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
              placeholder="Password"
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
              "Sign Up"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-3">
          <span>Have an account?</span>
          <Link to="/sign-in" className="text-blue-500">
            Sign In
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

export default SignUp;
