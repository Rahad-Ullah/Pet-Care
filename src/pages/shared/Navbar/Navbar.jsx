import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo_petcare.png"
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const {user, logout} = useAuth()
    
    const links = <>
        <li><NavLink to={'/'} className={({isActive}) => isActive ? 'text-primary' : 'text-black'}>Home</NavLink></li>
        <li><NavLink to={'/pet-listing'} className={({isActive}) => isActive ? 'text-primary' : 'text-black'}>Pet Listing</NavLink></li>
        <li><NavLink to={'/donation'} className={({isActive}) => isActive ? 'text-primary' : 'text-black'}>Donation Campaigns</NavLink></li>
        {
            !user && <li><NavLink to={'/auth/login'} className={({isActive}) => isActive ? 'text-primary' : 'text-black'}>Login</NavLink></li>
        }
    </>
    return (
        <div className="drawer shadow z-30">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-100 py-4 px-4 md:px-6 lg:px-8">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div> 
                    <div className="flex-1 justify-center lg:justify-start">
                        <img src={logo} alt="logo" className="h-10"/>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className=" menu-horizontal items-center font-medium gap-8">
                        {/* Navbar menu content here */}
                            {links}
                            {
                            user && <li>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                    </div>
                                </div>
                                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                    <li><Link onClick={() => logout()}>Logout</Link></li>
                                </ul>
                            </div>
                            </li>
                        }
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
            </div> 
            <div className="drawer-side z-10">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="p-6 py-16 flex flex-col gap-2 w-80 min-h-full bg-white bg-opacity-80">
                {/* Sidebar content here */}
                    {links}
                    <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                    <li><Link onClick={() => logout()}>Logout</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;