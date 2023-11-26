import { NavLink } from "react-router-dom";
import logo from "../../../../public/logo_petcare.png"

const Navbar = () => {
    const links = <>
        <li><NavLink to={'/'} className={({isActive}) => isActive ? 'text-primary' : 'text-neutral'}>Home</NavLink></li>
        <li><NavLink to={'/pet-listing'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-neutral'}>Pet Listing</NavLink></li>
        <li><NavLink to={'/donation'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-neutral'}>Donation Campaigns</NavLink></li>
        <li><NavLink to={'/auth/sign-up'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-neutral'}>Register</NavLink></li>
        {/* {
            user ? 
            <li><NavLink onClick={handleLogout} className={({isActive}) => isActive ? 'text-red-400' : 'text-white'}>Logout</NavLink></li>
            : <li><NavLink to={'/auth/login'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-white'}>Login</NavLink></li>
        } */}
        {/* <li>
            <NavLink to={'/dashboard/cart'} className="btn">
            <FaShoppingCart className="text-xl"></FaShoppingCart>
            <div className="badge badge-secondary">{cart.length}</div>
            </NavLink>
        </li> */}
    </>
    return (
        <div className="drawer text-black shadow z-20">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-100 py-4 px-4 md:px-6 lg:px-8">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div> 
                    <div className="flex-1">
                        <img src={logo} alt="logo" className="h-10"/>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className=" menu-horizontal items-center font-medium gap-4">
                        {/* Navbar menu content here */}
                            {links}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
            </div> 
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="p-4 flex flex-col gap-2 w-80 min-h-full bg-neutral-900 bg-opacity-80">
                {/* Sidebar content here */}
                    {links}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;