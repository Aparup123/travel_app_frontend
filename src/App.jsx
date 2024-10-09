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

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    children:[
      {
        index:true,
        element:<WelcomePage/>
      },
      {
        path:'/profile',
        element:<UserProfile/>
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
      }
    ]
  },
])


function App() {
    const [userData, setUserData]=useState({name:"", username:"", email:"", booked_trips:[], created_trips:[]})
    useEffect(() => {
        axios.get('http://localhost:3001/api/users/profile', {withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setUserData(res.data)
        }).catch((err)=>{
            console.log(err)
            redirect('/login')
        })

    }, []);
    
    
  return (
    <userContext.Provider value={{userData, setUserData}}>
      <div className='font-poppins'>
        <RouterProvider router={router}/>
      </div>
    </userContext.Provider>
  )
}

export {App}