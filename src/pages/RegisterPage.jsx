import { useContext, useEffect, useState } from "react";
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { ToggleSwitch } from "flowbite-react";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import Button from "../components/Button";

function RegisterPage() {
  const [loading, setLoading]=useState(false)
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

  function registerUser(user) {
    isSeller
      ? user.role="seller"
      : user.role="user" ;
    console.log("user:", user)
    setLoading(true)
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
      })
      .finally(()=>{
        setLoading(false)
      })
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
              <label htmlFor="name" className="label-text">
                Name
              </label>
              {errors?.name && (
                <p className="label-alt-text text-red-500">
                  {errors.name.message}
                </p>
              )}
              <input
                id="name"
                className="input input-bordered input-sm mb-2"
                {...register("name", { required: "Can't be empty!" })}
                type="text"
                placeholder=""
              />
              <label htmlFor="username" className="label-text">
                Username
              </label>
              {errors?.username && (
                <p className="label-alt-text text-red-500">
                  {errors.username.message}
                </p>
              )}
              <input
                id="username"
                className="input input-bordered input-sm mb-2"
                {...register("username", {
                  required: "Can't be empty!",
                  minLength: {
                    value: 3,
                    message: "At least 3 character long ",
                  },
                  maxLength: { value: 10, message: "Less than 10 characters " },
                })}
                type="text"
                placeholder=""
              />
              <label htmlFor="age" className="label-text">
                Age
              </label>
              {errors?.age && (
                <p className="label-alt-text text-red-500">
                  {errors.age.message}
                </p>
              )}
              <input
                id="age"
                className="input input-bordered input-sm mb-2"
                {...register('age',{required:"Can't be empty!"})}
                type="number"
                placeholder=""
              />
              <label htmlFor="age" className="label-text">
                Email
              </label>
              {errors?.email && (
                <p className="label-alt-text text-red-500">
                  {errors.email.message}
                </p>
              )}
              <input
                className="input input-bordered input-sm mb-2"
                {...register("email", { required: "Can't be empty!" })}
                type="email"
                placeholder=""
              />
              <label htmlFor="age" className="label-text">
                Password
              </label>
              {errors?.password && (
                <p className="label-alt-text text-red-500">
                  {errors.password.message}
                </p>
              )}
              <input
                className="input input-bordered input-sm mb-2"
                {...register("password", {
                  required: "Can't be empty!",
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
                  <label htmlFor="org_name" className="label-text">
                    Organization name
                  </label>
                  {errors?.org_name && (
                    <p className="label-alt-text text-red-500">
                      {errors.org_name.message}
                    </p>
                  )}
                  <input
                    className="input input-bordered input-sm mb-2"
                    {...register("org_name", {
                      required: { value: isSeller, message: "Can't be empty!" },
                    })}
                    type="text"
                    placeholder=""
                  />
                  <label htmlFor="org_location" className="label-text">
                    Organization location
                  </label>
                  {errors?.org_location && (
                    <p className="label-alt-text text-red-500">
                      {errors.org_location.message}
                    </p>
                  )}
                  <input
                    className="input input-bordered input-sm mb-2"
                    {...register('org_location',{required:{value:isSeller,message:"Can't be empty!"}})}
                    type="text"
                    placeholder=""
                  />
                </>
              )}
              {/* <button
                className="border-2 rounded border-blue-400 bg-blue-500 py-1 text-white mt-2 mb-4"
                type="submit"
              >
                Register
              </button> */}
              <Button loading={loading} type="submit" className="my-2">Register</Button>
              <span className="block text-center mb-2 mt-2">or signup with...</span>
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
