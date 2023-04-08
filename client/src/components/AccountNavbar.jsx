import React from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineProfile } from "react-icons/ai";
import {BsBookmarkPlus} from 'react-icons/bs';
import {MdOutlinePlace} from 'react-icons/md';

const AccountNavbar = () => {
  const {pathname} = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage=== undefined){                                                        
    subpage = 'profile';
  }
  function linkClasses(type = undefined) {
    let classes = "py-2 px-6 inline-flex items-center gap-2 text-xs md:text-lg";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-200 rounded-full";
    }
    return classes;
  }

  return (
    <nav className="w-full flex mt-8 gap-2 px-2 justify-center mb-8">
      <Link to={"/account"} className={linkClasses("profile")}>
        <AiOutlineProfile />
        Profile
      </Link>
      <Link to={"/account/bookings"} className={linkClasses("bookings")}>
        <BsBookmarkPlus />
        Bookings
      </Link>
      <Link to={"/account/places"} className={linkClasses("places")}>
        <MdOutlinePlace />
        Accomodations
      </Link>
    </nav>
  );
};


export default AccountNavbar;
