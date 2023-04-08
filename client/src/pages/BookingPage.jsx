import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlacePhoto } from "../components";
import { GrLocation } from "react-icons/gr";

const BookingPage = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/booking").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBookings(foundBooking);
        }
      });
    }
  }, [id]);

  if (!bookings) {
    return "";
  }

  return (
    <div className="bg-gray-100 my-8">
      <h2>{bookings.place.title}</h2>
      <a
        className="flex items-center my-2 font-semibold underline gap-1"
        target="_blank"
        href={`https://maps.google.com/?q=${bookings.place.address}`}
      >
        <GrLocation className="h-5 w-5" />
        {bookings.place.address}
      </a>
      <PlacePhoto place={bookings.place} />
    </div>
  );
};

export default BookingPage;
