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
import PrivateRoutes from "./PrivateRoutes";
import CreateCampaign from "../pages/Dashboard/User/CreateCampaign";
import MyCampaigns from "../pages/Dashboard/User/MyCampaigns";
import UpdateCampaign from "../pages/Dashboard/User/UpdateCampaign";
import Campaigns from "../pages/Campaigns/Campaigns";
import CampaignDetails from "../pages/CampaignDetails/CampaignDetails";
import MyDonations from "../pages/Dashboard/User/MyDonations";
import AdoptionRequests from "../pages/Dashboard/User/AdoptionRequests";


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
        },
        {
          path: 'donation-campaigns',
          element: <Campaigns></Campaigns>
        },
        {
          path: 'campaign-details/:id',
          element: <CampaignDetails></CampaignDetails>
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
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children: [
        {
          path: 'user-home',
          element: <></>
        },
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
          element: <AdoptionRequests></AdoptionRequests>
        },
        {
          path: 'create-campaign',
          element: <CreateCampaign></CreateCampaign>
        },
        {
          path: 'update-campaign/:id',
          element: <UpdateCampaign></UpdateCampaign>
        },
        {
          path: 'my-campaigns',
          element: <MyCampaigns></MyCampaigns>
        },
        {
          path: 'my-donations',
          element: <MyDonations></MyDonations>
        },
        {
          path: 'users',
          // element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
      ]
    },
  ]);

export default router;