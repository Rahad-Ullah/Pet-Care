import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar/Navbar";

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;