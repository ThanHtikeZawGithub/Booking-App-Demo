import {Link} from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { AccountNavbar, Image } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";



const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/user-places').then(({data})=>{
      console.log(data);

      setPlaces(data);
    });
  },[]);

  return (
    <div>
      <AccountNavbar/>
        <div className="text-center">
          <Link
            className="inline-flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-full"
            to={"/account/places/new"}
          >
            <AiOutlinePlus />
            Add new place
          </Link>
        </div>
        <div className="py-12 md:px-24 overflow-hidden">
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} className="flex gap-4 bg-gray-100 overflow-hidden p-4 rounded-2xl cursor-pointer">
              <div className=" flex w-32 h-32 grow shrink-0" key={place.owner}>
                {place.photos.length > 0 && (
                  <Image src={place.photos[0]} alt="place photos" className="object-cover rounded-xl" />
                )}
              </div>
              <div className="grow-0 shrink">
              <h2 className="text-sm md:text-xl">{place.title}</h2>
              <p className=" text-xs md:text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
};

export default PlacesPage;
