import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import { Booking, PlacePhoto } from "../components";

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!id || !place) {
    return "";
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-4">
      <h1 className="text-3xl mr-36">{place.title}</h1>
      <a
        className="flex items-center my-2 block font-semibold underline gap-1"
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
      >
        <GrLocation className="h-5 w-5" />
        {place.address}
      </a>
      <PlacePhoto place={place}/>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] my-8 ">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl my-2">Description</h2>
            {place.description}
          </div>
          CheckIn: {place.checkIn}
          <br />
          CheckOut: {place.checkOut}
          <br />
          Max number of guest: {place.maxGuest}
        </div>
        <Booking place={place} />
      </div>
      <div className="bg-white -mx-8 px-8 borter-t py-8">
        <h2 className="font-semibold text-2xl my-2">Extra Info</h2>
        <div className=" text-sm text-gray-700 mt-2 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
