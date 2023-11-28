import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import PetListing from "../pages/PetListing/PetListing";
import PetDetails from "../pages/PetDetails/PetDetails";
import Dashboard from "../layouts/Dashboard/Dashboard";
import AddPet from "../pages/Dashboard/User/AddPet";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          index: true,
          element: <Home></Home>
        },
        {
          path: 'pet-listing',
          element: <PetListing></PetListing>
        },
        {
          path: 'pet-details/:id',
          element: <PetDetails></PetDetails>
        }
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout></AuthLayout>,
      children: [
        {
          path: "sign-up",
          element: <SignUp></SignUp>
        },
        {
          path: "login",
          element: <Login></Login>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'user-home',
          element: <></>
        },

        // admin routes
        {
          path: 'add-pet',
          element: <AddPet></AddPet>
        },
        {
          path: 'my-pets',
          element: <></>
        },
        {
          path: 'requests',
          element: <></>
        },
        {
          path: 'create-campaign',
          element: <></>
        },
        {
          path: 'my-donations',
          element: <></>
        },
        {
          path: 'users',
          // element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
      ]
    },
  ]);

export default router;