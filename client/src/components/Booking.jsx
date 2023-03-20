import { useState } from "react";
import {differenceInCalendarDays} from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";

const Booking = ({place}) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    let numOfDays = 0;
    if (checkIn && checkOut) {
        numOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    };
    const BookThisPlace = async() => {

        const data = {
            checkIn,
            checkOut,
            numOfGuests,
            name,
            phone,
            place:place._id,
            price: numOfDays * place.price,
        };
        const res = await axios.post('/booking', data);
        // const bookingId = res.data._id;
        setRedirect(`/account/bookings`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

  return (
    <div>
          <div className="bg-white shadow p-4 rounded-2xl">
            <h1 className="text-xl text-center">
              Price: MMK {place.price} /night
            </h1>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
              <div className="px-4 py-2 border-r">
                <label>Check in</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              </div>
              <div className="px-4 py-2">
                <label>Check Out</label>
                <input type="date" value={checkOut} onChange={e=> setCheckOut(e.target.value)} />
              </div>
              </div>
              <div className="px-4 py-2">
                <label>Number of Guest:</label>
                <input type="number" value={numOfGuests} onChange={e => setNumOfGuests(e.target.value)} />
              </div>
              {numOfDays > 0 && (
                <div className="py-3 px-4 border-t">
                    <label>Your Full Name: </label>
                    <input type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                    <label>Phone Number: </label>
                    <input type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)} />
                </div>
              )}
            </div>
            <button className="primary mt-4" onClick={BookThisPlace}>
                Book this place
                {numOfDays > 0 && (
                    <span>{numOfDays * place.price}</span>
                )}
            </button>
          </div>
        </div>
  )
}

export default Booking