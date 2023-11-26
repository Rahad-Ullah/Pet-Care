import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";


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
          path: 'sign-up',
          element: <SignUp></SignUp>
        },
      ]
    },
  ]);

export default router;