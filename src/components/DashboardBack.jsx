import { IoIosArrowBack } from "react-icons/io";
import { Navigate } from "react-router-dom";

const DashboardBack = () => {
    return (
        <span onClick={() => Navigate(-1)} className="inline-flex items-center gap-1 text-lg font-bold mb-8 link link-hover"><IoIosArrowBack></IoIosArrowBack>
        Back</span>
    );
};

export default DashboardBack;