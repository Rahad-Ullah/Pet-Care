import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AuthLayout from "../layouts/AuthLayout.jsx/AuthLayout";
import PetListing from "../pages/PetListing/PetListing";


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
    }
  ]);

export default router;