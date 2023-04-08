import { useEffect, useState } from "react";
import { AccountNavbar, Image } from "../components";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { RxCalendar } from "react-icons/rx";
import {BiMoon} from 'react-icons/bi';
import { Navigate } from "react-router-dom";
import {FaRegMoneyBillAlt} from 'react-icons/fa';

const BookingsPage = () => {
  const [booking, setBooking] = useState([]);
  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    axios.get("/booking").then((res) => {
      setBooking(res.data);
    });
  }, []);
  if (redirect) {
    return <Navigate to={redirect}/>
  }
  return (
    <div>
      <AccountNavbar />
      <div className="grid gap-4 px-2 md:px-24">
      {booking?.length > 0 &&
          booking.map((bookings) => (
        <div onClick={()=> setRedirect(`/account/bookings/${bookings._id}`)} className="cursor-pointer">
            <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
              {bookings.place.photos.length > 0 && (
                <div className="basis-1/3 md:basis-1/4">
                  <Image
                    src={bookings.place.photos[0]}
                    alt="photo"
                    className="object-cover h-full md:h-[190px] lg:h-[180px] w-full"
                  />
                </div>
              )}
              <div className="py-2 px-2 md:px-8 basis-2/3 md:3/4 ">
                <h2 className="text-sm md:text-md lg:text-xl">{bookings.place.title}</h2>
                <div className="text-sm flex items-center gap-2">
                  <RxCalendar />
                  {format(new Date(bookings.checkIn), "yyyy-MM-dd")}
                  &rarr;
                  <RxCalendar />
                  {format(new Date(bookings.checkOut), "yyyy-MM-dd")}
                </div>
                <div className="flex items-center gap-1">
                    <BiMoon/>
                  {differenceInCalendarDays(
                    new Date(bookings.checkOut),
                    new Date(bookings.checkIn)
                  )}
                  days 
                  </div>
                  <div className=" text-sm flex items-center gap-1">
                  <FaRegMoneyBillAlt/>
                  Total price: <span className="font-bold">{bookings.price} MMK</span>
                  </div>
                
              </div>
            </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
