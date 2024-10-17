import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import FormValidationError from "../components/FormValidationError";
import { enqueueSnackbar } from "notistack";


function LoginPage() {
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
        enqueueSnackbar('Failed to login! Try again.', {variant:'error'})
      });
  }
  return (
    <div className="w-full h-[90vh] bg-gray-50 flex justify-center items-center text-gray-900">
      <div className="border-2 rounded-md ">
        <div className=" bg-gray-200 w-full p-2 px-4 text-center">
          <h2 className="text-xl">Login</h2>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-[20rem] md:w-[25rem] flex flex-col gap-3 justify-center items-center px-2 py-6"
        >
          <div className="w-11/12">
            <label className="text-xl" htmlFor="email">
              Email
            </label>
            {validationError.emailError && (
              <FormValidationError errorMessage={validationError.emailError} />
            )}
            <input
              className="w-full px-2 py-0.5 mt-1 border-1 border-gray-200 rounded text-gray-700"
              name="email"
              type="email"
              placeholder="  "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-11/12">
            <label className="text-xl" htmlFor="password">
              password
            </label>
            {validationError.passwordError && (
              <FormValidationError
                errorMessage={validationError.passwordError}
              />
            )}
            <input
              className="w-full px-2 py-0.5 mt-1 border-2 border-gray-200  rounded "
              name="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="mt-2 mx-auto block btn btn-sm btn-neutral "
            type="submit"
          >
            Login
          </button>
          {/* <Button color="gray" size="sm">Login</Button> */}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
