import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";

import { enqueueSnackbar } from "notistack";
import Button from "../components/Button";


function LoginPage() {
  const [loading, setLoading]=useState(false)
  const { userData, setUserData } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({
    emailError: "",
    passwordError: "",
  });
  const navigate = useNavigate();
  

  function validate(email, password) {
    const errorObject = {
      emailError: "",
      passwordError: "",
      error: false,
    };

    if (!email.includes("@")) errorObject.emailError = "Not a valid email";
    if (email.length == 0) errorObject.emailError = "Email can't be empty";

    if (password.length == 0)
      errorObject.passwordError = "Password can't be empty";
    if (errorObject.emailError || errorObject.passwordError)
      errorObject.error = true;
    return errorObject;
  }

  useEffect(() => {
    if (userData.username) {
      navigate("/profile");
    }
  }, [userData, navigate]);

  function handleLogin(e) {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    const errorObj = validate(email, password);
    setValidationError(errorObj);
    if (errorObj.error) {
      console.log(errorObj);
      return;
    }
    setLoading(true)
    axios
      .post(`${import.meta.env.VITE_SITE_URL}/api/users/login`, body, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
        enqueueSnackbar('Logged in successfully.', {variant:'success'})
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Email or password is incorrect! Try again.', {variant:'error'})
      })
      .finally(()=>{
        setLoading(false)
      })
  }
  return (
    <div className="flex justify-center p-4 text-gray-900">
      <div className="border-2 rounded-md ">
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold text-center p-4">Hey, welcome  </h1>
          <h2 className="text-xl text-gray-800">login and manage your trips</h2>
        </div>
        <form
          onSubmit={handleLogin}
          className="p-4"
        >
          
            <label className="label" htmlFor="email">
              Email
            </label>
            {validationError?.emailError && (
              <p className="label label-alt-text text-red-500">{validationError.emailError}</p>
            )}
            <input
              className="input input-bordered"
              name="email"
              type="email"
              placeholder="  "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label" htmlFor="password">
              Password
            </label>
            {validationError.passwordError && (
              <p className="label label-alt-text text-red-500">{validationError.passwordError}</p>
            )}
            <input
              className="input input-bordered"
              name="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          {/* <button
            className="mt-3 mx-auto block btn btn-block btn-neutral "
            type="submit"
          >
            Login
          </button> */}
          <Button type="submit" loading={loading} className="btn-block block my-4">Login</Button>
          {/* <Button color="gray" size="sm">Login</Button> */}
        </form>
        <div className="pb-4">
          <p className="text-center">{"Don't have an account?"} <Link to="/register" className="link text-blue-500">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
