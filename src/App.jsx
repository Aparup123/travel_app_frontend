import {useEffect, useState } from 'react'
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { userContext } from './contexts/userContext'
import WelcomePage from './pages/WelcomePage'
import TripsPage from './pages/TripsPage'
import Trip from './pages/TripPage'
import CreateTrip from './pages/CreateTrip'
import SellerDashboard from './pages/SellerDashboard'
import {tripContext} from './contexts/tripContext'
import MyTrips from './pages/MyTrips'
import MyProfile from './pages/MyProfile'
import ErrorPage from './pages/ErrorPage'
import userProfileLoader from './utils/loaders/userProfileLoader'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        element:<WelcomePage/>
      },
      {
        path:'/profile',
        element:<MyProfile/>
      },
      {
        path:'/profile/:name',
        element:<UserProfile/>,
        errorElement:<ErrorPage/>,
        loader:userProfileLoader
      },
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/register',
        element:<RegisterPage/>
      },
      {
        path:'/trips',
        element:<TripsPage/>
      },
      {
        path:'/trips/:id',
        element:<Trip/>
      },
      {
        path:'/create_trip',
        element:<CreateTrip/>
      },
      {
        path:'/seller_dashboard',
        element:<SellerDashboard/>
      },
      {
        path:'/my_trips',
        element:<MyTrips/>
      },
      {
        path:'/error',
        element:<ErrorPage/>
      }
    ]
  },
])


function App() {
    const [userData, setUserData]=useState({name:"", username:"", email:"", booked_trips:[], created_trips:[]})
    const [trips, setTrips]=useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/users/profile', {withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setUserData(res.data)

           
        }).catch((err)=>{
            console.log(err)
            redirect('/login')
        })

         // fetch trips
         axios.get("http://localhost:3001/api/trips")
         .then((res)=>{
           setTrips(res.data)
         })
         .catch((err)=>{
           console.log(err)
         })
        
    }, []);
    
    
  return (
    <userContext.Provider value={{userData, setUserData}}>
      <tripContext.Provider value={{trips, setTrips}}>
        <div className='font-poppins'>
          <RouterProvider router={router}/>
        </div>
      </tripContext.Provider>
    </userContext.Provider>
  )
}

export {App}