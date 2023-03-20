
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { GrFormSearch } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import {IoMdContact} from 'react-icons/io';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const navbar = () => {
  const {user} = useContext(UserContext);
  return (
    <header className="flex items-center justify-between">
      <Link to={'/'} className="flex items-center gap-2">
        <HiOutlinePaperAirplane className="w-6 h-6" />
        <span className="font-bold text-xl">airbnb</span>
      </Link>
      <div className="flex items-center border border-gray-400 py-1 px-4 rounded-full gap-2 shadow-md shadow-gray-100">
        <div className="text-xs">Anywhere</div>
        <div className="border-l border-gray-300 text-white">|</div>
        <div className="text-xs">Any week</div>
        <div className="border-l border-gray-300 text-white">|</div>
        <div className="text-xs">Add guests</div>
        <button className="bg-primary p-1 rounded-full">
          <GrFormSearch className="w-4 h-4 " />
        </button>
      </div>
        <Link to={user? '/account':'/login'} className="flex items-center border border-gray-400 rounded-full px-3 py-2 gap-2"><RxHamburgerMenu/>
        <IoMdContact/>
        {!!user && (
          <div className="hidden md:flex">
            {user.name}
          </div>
        )}
        </Link>
    </header>
  );
};

export default navbar;
