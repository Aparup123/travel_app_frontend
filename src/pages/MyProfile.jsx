import { useContext, useEffect, useState } from 'react'
import { userContext } from '../contexts/userContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import Button from '../components/Button'
import { BiEdit } from 'react-icons/bi'
function MyProfile() {
  const [loading, setLoading] = useState(false)
  const [userImage, setUserImage]=useState()
  const { userData, setUserData } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData.username) {
      navigate('/login')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  async function uploadProfileImage(){
    try{
      const data=new FormData()
      data.append('file', userImage)
      const res=await axios.post(`${import.meta.env.VITE_SITE_URL}/api/users/profile/image`, data, {withCredentials:true})
      setUserData(res.data)
      enqueueSnackbar('Image uploaded successfully', {variant:'success'})
    }catch(err){
      enqueueSnackbar('Upload failed', {variant:'error'})
      console.log(err)
    }
  }

  function logout() {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_SITE_URL}/api/users/logout`, null, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        var userClearObject = { name: "", username: "", email: "", booked_trips: [] }


        console.log(userClearObject)
        setUserData(userClearObject)
        enqueueSnackbar('Logged out.', { variant: 'success' })
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className='flex flex-col items-center p-2'>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <label htmlFor="uploadImage" className="block mt-2 mb-4">
            Upload profile picture
          </label>
          <div
            id="uploadImage"
            className="flex w-full items-center justify-center mb-2"
          >
            <label
              htmlFor="dropzone-file"
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {!userImage ? (
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
                    Upload profile picture
                  </p>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(userImage)}
                  className="h-[5rem] w-auto"
                />
              )}
              <input
                type="file"
                id="dropzone-file"
                className="hidden"
                onChange={(e) => {
                  setUserImage(e.target.files[0]);
                }}
                accept="image/*"
              />
            </label>
          </div>
          <Button onClick={uploadProfileImage}>save</Button>
        </div>
      </dialog>
      <div className='border p-4 mt-2'>
        <div className=''>
        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}><BiEdit/></button>
          <div className="avatar flex justify-center text-center">
            <div className="w-24 text-center block rounded-full">
              <img src={userData.profile_picture?userData.profile_picture.url:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
            </div>
          </div>
          <h2 className='text-xl text-center'>{userData.name}</h2>
          <p><span className='font-bold'>Username:</span>{userData.username}</p>
          <p><span className='font-bold'>email:</span>{userData.email}</p>
          <div className='text-center'>
            {/* <button className="btn btn-neutral btn-sm my-2 " onClick={logout}>Log out</button> */}
            <Button onClick={logout} loading={loading}>Logout</Button>
          </div>
        </div>

        {(userData.role == "user") &&
          <div className=''>
            <h2 className=''>Links</h2>
            <Link to="/my_trips" className='btn btn-outline btn-sm'>My trips</Link>
            {/* {userData.booked_trips.map((trip) => <div key={trip._id} onClick={()=>navigate(`/trips/${trip._id}`)}><Trip key={trip._id} trip={trip} /></div>)} */}
          </div>
        }
      </div>
    </div>

  )
}

export default MyProfile