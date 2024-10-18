import { useState, useContext, useEffect } from "react";
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { Label, FileInput } from "flowbite-react";

import axios from "axios";
import { tripContext } from "../contexts/tripContext";
import getCurrentDate from "../utils/getCurrentDate";
import { useSnackbar } from "notistack";

export default function CreateTrip() {
  const [loading, setLoading] = useState(false);
  const [tripImage, setTripImage] = useState(null);
  const [trip, setTrip] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    total_capacity: "",
    price: 0.0,
    cover_image: "",
  });
  const { userData, setUserData } = useContext(userContext);
  const { trips, setTrips } = useContext(tripContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  console.log(tripImage);
  useEffect(() => {
    if (userData.role == "user") {
      navigate("/profile");
    }
  });
  console.log(trip);

  async function uploadTripImage() {
    if (!tripImage) return;

    const data = new FormData();
    data.append("enctype", "multipart/form-data");
    data.append("file", tripImage);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SITE_URL}/api/trips/image/`,
        data,
        { withCredentials: true }
      );
      console.log(res.data.secure_url);
      return res.data.secure_url;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function createTrip(e) {
    e.preventDefault();

    setLoading(true);
    
    //upload trip image to cloudinary

    try {
      const imageLink = await uploadTripImage();
      if (!imageLink) {
        enqueueSnackbar("Image upload failed!", { variant: "error" });
        return;
      }
      enqueueSnackbar("image uploaded successfully", { variant: "success" });
      console.log(trip);
      trip.cover_image = imageLink;
      const res = await axios.post(
        `${import.meta.env.VITE_SITE_URL}/api/trips/`,
        trip,
        { withCredentials: true }
      );
      console.log(res);
      setUserData({
        ...userData,
        created_trips: userData.created_trips.concat(res.data),
      });
      setTrips(trips.concat(res.data));
      enqueueSnackbar("Trip created", { variant: "success" });
      navigate("/seller_dashboard");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Failed creating trip!", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="border p-4 mt-6 inline-block   ">
        <h1 className="text-2xl mb-2">Create trip</h1>
        <form className="md:grid grid-cols-2 gap-y-3" onSubmit={createTrip}>
          <label htmlFor="trip_title" className="block">
            Trip Title
          </label>
          <input
            type="text"
            id="trip_title"
            className="p-0"
            onChange={(e) => {
              setTrip({ ...trip, title: e.target.value });
            }}
          />
          <label htmlFor="location" className="block">
            location
          </label>
          <input
            id="location"
            type="text"
            onChange={(e) => {
              setTrip({ ...trip, location: e.target.value });
            }}
          />
          <label htmlFor="description" className="block">
            Trip description
          </label>
          <textarea
            id="description"
            onChange={(e) => {
              setTrip({ ...trip, description: e.target.value });
            }}
          ></textarea>
          <label htmlFor="start_date" className="block">
            Start date
          </label>
          <input
            id="start_date"
            type="date"
            min={getCurrentDate()}
            onChange={(e) => {
              setTrip({ ...trip, start_date: e.target.value });
            }}
          />
          <label htmlFor="end_date" className="block">
            End date
          </label>
          <input
            id="end_date"
            type="date"
            disabled={trip.start_date ? false : true}
            min={trip.start_date}
            onChange={(e) => {
              setTrip({ ...trip, end_date: e.target.value });
            }}
          />
          <label htmlFor="capacity" className="block">
            Total capacity
          </label>
          <input
            id="capacity"
            type="number"
            onChange={(e) => {
              setTrip({ ...trip, total_capacity: e.target.value });
            }}
          />
          <label htmlFor="price" className="block">
            Ticket price
          </label>
          <input
            id="price"
            type="number"
            onChange={(e) => {
              setTrip({ ...trip, price: e.target.value });
            }}
          />
          <label htmlFor="uploadImage" className="block mt-2">
            Upload trip cover image
          </label>
          <div
            id="uploadImage"
            className="flex w-full items-center justify-center mb-2"
          >
            <Label
              htmlFor="dropzone-file"
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {!tripImage ? (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    upload trip cover image
                  </p>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(tripImage)}
                  className="h-[5rem] w-auto"
                />
              )}
              <FileInput
                id="dropzone-file"
                className="hidden"
                onChange={(e) => {
                  setTripImage(e.target.files[0]);
                }}
                accept="image/*"
              />
            </Label>
          </div>
          <div></div>
          <button
            type="submit"
            className="btn btn-neutral btn-sm btn-block py-1"
            disabled={loading}
          >
            {loading?<span> <span className="loading loading-bars loading-sm "></span></span>:<p>Create</p>} 
          </button>
          
        </form>
      </div>
    </div>
  );
}
