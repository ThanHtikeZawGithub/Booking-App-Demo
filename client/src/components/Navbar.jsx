import { HiOutlinePaperAirplane } from "react-icons/hi";
import { GrFormSearch } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useContext, useState, useCallback } from "react";
import { UserContext } from "../UserContext";
import MenuItems from "./MenuItems";

const navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return (
    <header className="flex items-center justify-between z-10">
        <Link to={"/"} className="flex items-center gap-2">
          <HiOutlinePaperAirplane className="w-9 h-9" />
          <span className="font-bold text-xl md:text-2xl">airbnb</span>
        </Link>
        <div
          className=" hidden md:flex md:items-center md:border md:border-gray-400
                 py-2 px-6 rounded-full gap-2 shadow-sm transition hover:shadow-md shadow-gray-300 md:w-auto cursor-pointer "
        >
          <div className="text-md font-semibold text-center">Anywhere</div>
          <div className="border-gray-300 text-white">|</div>
          <div className="border-x-[2px] px-4 text-md font-semibold">
            Any week
          </div>
          <div className="border-gray-300 text-white">|</div>
          <div className="text-md font-semibold">Add guests</div>
          <button className="bg-primary p-1 rounded-full">
            <GrFormSearch className="w-8 h-8 text-white " />
          </button>
        </div>
        <div className="flex items-center justify-between border rounded-full py-3 px-6 gap-3">
          <button onClick={toggleOpen} className="shadow-sm hover:shadow-lg">
            <GiHamburgerMenu className="w-6 h-6 bg-white" />
          </button>
          <CgProfile className="w-6 h-6" />
        </div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-1/4 bg-white overflow-hidden right-0 top-20 text-sm">
            <div className="flex flex-col cursor-pointer">
              <MenuItems
                link={user ? "/account" : "/register"}
                label="Sign Up"
              />
              <MenuItems link={user ? "/account" : "/login"} label="Log In" />
              {user && (
                <>
                  <MenuItems link="/account" label="My account" />
                  <MenuItems link="/account/bookings" label="My bookings" />
                  <MenuItems link="/account/places" label="Create bookings" />
                  <hr />
                  <MenuItems link="/account" label="log Out" />
                </>
              )}
            </div>
          </div>
        )}
    </header>
  );
};

export default navbar;
