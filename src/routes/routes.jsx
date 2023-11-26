import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx/MainLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          index: true,
          element: <Home></Home>
        }
      ]
    },
  ]);

export default router;