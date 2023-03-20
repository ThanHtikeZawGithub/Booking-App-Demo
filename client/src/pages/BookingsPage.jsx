import { useEffect, useState } from "react";
import { AccountNavbar } from "../components";
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
      <div className="grid gap-4">
      {booking?.length > 0 &&
          booking.map((bookings) => (
        <div onClick={()=> setRedirect(`/account/bookings/${bookings._id}`)} className="cursor-pointer">
            <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
              {bookings.place.photos.length > 0 && (
                <div className="w-40 h-20">
                  <img
                    src={`http://localhost:4000/uploads/${bookings.place.photos[0]}`}
                    alt="photo"
                  />
                </div>
              )}
              <div className="py-3">
                <h2 className="text-xl">{bookings.place.title}</h2>
                <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-1">
                  <FaRegMoneyBillAlt/>
                  Total price: <span className="font-bold">MMK </span>{bookings.price}
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
