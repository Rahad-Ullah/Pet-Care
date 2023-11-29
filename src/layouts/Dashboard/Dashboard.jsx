import { FaBars, FaDonate, FaEdit, FaHome, FaList } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar/Navbar";
import "./Dashboard.css"
import { IoCreateOutline, IoPaw } from "react-icons/io5";
import { BsFiles } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";

const Dashboard = () => {
    return (
    <div>
        <Navbar></Navbar>
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center min-h-screen bg-gray-50">
                {/* Page content here */}
                <div className="w-full bg-white py-2 px-2 shadow fixed top-0 z-20 flex items-center lg:hidden">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button"><FaBars className="text-xl"/></label>
                    <h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <div className="w-full p-10">
                    <Outlet></Outlet>
                </div>
            
            </div>
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="sidemenu p-4 w-80 min-h-full bg-base-100 font-semibold md:font-bold space-y-1 shadow">
                    {/* Sidebar content here */}
                    {
                    <>
                        <li><NavLink to={'/dashboard/user-home'} className={   ({isActive}) => isActive ? 'text-primary flex items-center gap-4' : 'text-gray-500 flex items-center gap-4'}>
                            <FaHome className="text-lg"/> 
                            User home</NavLink></li>
                        <li><NavLink to={'/dashboard/add-pet'} className={   ({isActive}) => isActive ? 'text-primary flex items-center gap-4' : 'text-gray-500 flex items-center gap-4'}>
                            <IoPaw className="text-lg"/> 
                            Add a pet</NavLink></li>
                        <li><NavLink to={'/dashboard/my-pets'} className={   ({isActive}) => isActive ? 'text-primary flex items-center gap-4' : 'text-gray-500 flex items-center gap-4'}>
                            <FaList className="text-lg"/> 
                            My added pets</NavLink></li>
                        <li><NavLink to={'/dashboard/requests'} className={   ({isActive}) => isActive ? 'text-primary flex items-center gap-4' : 'text-gray-500 flex items-center gap-4'}>
                            <BsFiles className="text-lg"/> 
                            Adoption requests</NavLink></li>
                        <li><NavLink to={'/dashboard/create-campaign'} className={   ({isActive}) => isActive ? 'text-primary flex items-center gap-4' : 'text-gray-500 flex items-center gap-4'}>
                            <FaEdit className="text-lg"/> 
                            Create donation campaign</NavLink></li>
                        <li><NavLink to={'/dashboard/my-campaigns'} className={   ({isActive}) => isActive ? 'text-primary flex items-center gap-4' : 'text-gray-500 flex items-center gap-4'}>
                            <FaHandHoldingDollar className="text-lg"/> 
                            My donation campaigns</NavLink></li>
                        <li><NavLink to={'/dashboard/my-donations'} className={   ({isActive}) => isActive ? 'text-primary flex items-center gap-4' : 'text-gray-500 flex items-center gap-4'}>
                            <FaDonate className="text-lg"/> 
                            My donations</NavLink></li>
                    </>
                    // <>
                    //     <li><NavLink to={'/dashboard/user-home'}><AiFillHome className="text-xl"/> User Home</NavLink></li>
                    //     <li><NavLink to={'/dashboard/reservation'}><FaCalendarAlt className="text-xl"/> Reservation</NavLink></li>
                    //     <li><NavLink to={'/dashboard/payment-history'}><IoWalletSharp className="text-xl"/> Payment History</NavLink></li>
                    //     <li><NavLink to={'/dashboard/cart'}><FaCartShopping  className="text-xl"/> My Cart ({cart.length})</NavLink></li>
                    //     <li><NavLink to={'/dashboard/review'}><MdReviews   className="text-xl"/> Add Review</NavLink></li>
                    // </>

                    }
                    {/* divider */}
                    <div className="divider before:bg-white after:bg-white"></div>
                    {/* <li><NavLink to={'/'}><AiFillHome className="text-xl"/> Home</NavLink></li>
                    <li><NavLink to={'/menu'}><FaBars className="text-xl"/> Menu</NavLink></li>
                    <li><NavLink to={'/order/pizza'}><IoBag className="text-xl"/> Shop</NavLink></li>
                    <li><NavLink to={'/contact-us'}><IoMail className="text-xl"/> Contact</NavLink></li> */}
                </ul>
            </div>
        </div>
    </div>
    );
};

export default Dashboard;