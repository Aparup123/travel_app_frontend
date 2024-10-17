import { useContext, useEffect, useState } from "react";
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { ToggleSwitch } from "flowbite-react";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userData, setUserData } = useContext(userContext);
  const [isSeller, setIsSeller] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.username) {
      navigate("/profile");
    }
  }, []);



  // const [user, setUser] = useState({
  //   name: "",
  //   username: "",
  //   age: "",
  //   email: "",
  //   password: "",
  //   org_name: "",
  //   org_location: "",
  //   role: "",
  // });

  // useEffect(() => {
  //   isSeller
  //     ? setUser({ ...user, role: "seller" })
  //     : setUser({ ...user, role: "user" });
  // }, [isSeller]);

  function onSubmit(data) {
    console.log(data);
    console.log(errors);
  }

  function registerUser(user) {
    isSeller
      ? user.role="seller"
      : user.role="user" ;
    console.log("user:", user)
    axios.post(`${import.meta.env.VITE_SITE_URL}/api/users/register`, user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
        enqueueSnackbar("Registered successfully.", { variant: "success" });
        navigate("/trips");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Registration failed!", { variant: "error" });
      });
  }
  return (
    <>
      <div className="flex justify-center ">
        <div className="flex border rounded mt-5 mb-5">
          <div className="py-4">
            <div className="mb-4">
              <h2 className="text-center text-2xl">Register and get ready</h2>
            </div>
            <form
              onSubmit={handleSubmit(registerUser)}
              className="flex flex-col px-6 text-sm justify-center"
            >
              <div className="float-right">
                <ToggleSwitch
                  checked={isSeller}
                  label="Seller?"
                  onChange={setIsSeller}
                  sizing="sm"
                  className="float-right"
                />
              </div>
              <label htmlFor="name" className="mb-1">
                Name
              </label>
              {errors?.name && (
                <p className="label-alt-text text-red-500">
                  {errors.name.message}
                </p>
              )}
              <input
                id="name"
                className="border p-1 px-2 mb-2 text-sm"
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder=""
              />
              <label htmlFor="username" className="mb-1">
                Username
              </label>
              {errors?.username && (
                <p className="label-alt-text text-red-500">
                  {errors.username.message}
                </p>
              )}
              <input
                id="username"
                className="border p-1 px-2 mb-2 text-sm"
                {...register("username", {
                  required: "Username cannot be empty!",
                  minLength: {
                    value: 3,
                    message: "At least 3 character long ",
                  },
                  maxLength: { value: 10, message: "Less than 10 characters " },
                })}
                type="text"
                placeholder=""
              />
              <label htmlFor="age" className="mb-1">
                Age
              </label>
              {errors?.age && (
                <p className="label-alt-text text-red-500">
                  {errors.age.message}
                </p>
              )}
              <input
                id="age"
                className="border p-1 px-2 mb-2 text-sm"
                {...register('age',{required:"age is required"})}
                type="number"
                placeholder=""
              />
              <label htmlFor="age" className="mb-1">
                Email
              </label>
              {errors?.email && (
                <p className="label-alt-text text-red-500">
                  {errors.email.message}
                </p>
              )}
              <input
                className="border p-1 px-2 mb-2 text-sm"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder=""
              />
              <label htmlFor="age" className="mb-1">
                Password
              </label>
              {errors?.password && (
                <p className="label-alt-text text-red-500">
                  {errors.password.message}
                </p>
              )}
              <input
                className="border p-1 px-2 mb-2 text-sm"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 character long",
                  },
                })}
                type="password"
                placeholder=""
              />
              {isSeller && (
                <>
                  <label htmlFor="org_name" className="mb-1">
                    Organization name
                  </label>
                  {errors?.org_name && (
                    <p className="label-alt-text text-red-500">
                      {errors.org_name.message}
                    </p>
                  )}
                  <input
                    className="border p-1 px-2 mb-2 text-sm"
                    {...register("org_name", {
                      required: { value: isSeller, message: "Required" },
                    })}
                    type="text"
                    placeholder=""
                  />
                  <label htmlFor="org_location" className="mb-1">
                    Organization location
                  </label>
                  {errors?.org_location && (
                    <p className="label-alt-text text-red-500">
                      {errors.org_location.message}
                    </p>
                  )}
                  <input
                    className="border p-1 px-2 mb-2 text-sm"
                    {...register('org_location',{required:{value:isSeller,message:"Required"}})}
                    type="text"
                    placeholder=""
                  />
                </>
              )}
              <button
                className="border-2 rounded border-blue-400 bg-blue-500 py-1 text-white mt-2 mb-4"
                type="submit"
              >
                Register
              </button>
              <span className="block text-center mb-2">or signup with...</span>
              <div className="flex justify-center gap-2">
                <i className="text-xl border-2 p-1 rounded-full inline-block">
                  <FaGoogle />
                </i>
                <i className="text-xl border-2 p-1 rounded-full inline-block">
                  <FaFacebookF />
                </i>
              </div>
            </form>
          </div>
          {/* <div className="max-sm:hidden">
            <img src={registerImage} className="h-64  " />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
