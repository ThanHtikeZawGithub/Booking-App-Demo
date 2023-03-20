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
    let classes = "py-2 px-6 inline-flex items-center gap-2";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-200 rounded-full";
    }
    return classes;
  }

  return (
    <nav className="w-full flex mt-8 gap-2 justify-center mb-8">
      <Link to={"/account"} className={linkClasses("profile")}>
        <AiOutlineProfile />
        My Profile
      </Link>
      <Link to={"/account/bookings"} className={linkClasses("bookings")}>
        <BsBookmarkPlus />
        My Bookings
      </Link>
      <Link to={"/account/places"} className={linkClasses("places")}>
        <MdOutlinePlace />
        My accomodations
      </Link>
    </nav>
  );
};


export default AccountNavbar;
