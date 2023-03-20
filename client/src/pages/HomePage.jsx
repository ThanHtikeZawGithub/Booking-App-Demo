
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  },[]);
  return (
    <div className='grid mt-4 gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {places.length > 0 && places.map(place => (
          <Link to={'place/' + place._id} className='' key={place._id}>
            <div className='bg-gray-500 rounded-2xl flex mb-3'>
            {place.photos?.[0] && (
            <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/' +place.photos?.[0]} alt="" /> )}
            </div>
            <h3 className='font-bold text-xs'>{place.address}</h3>
            <h2 className='text-sm truncate text-gray-500 '>{place.title}</h2>
            <div className='text-sm font-semibold mt-1'
            >
              ${place.price}/night
            </div>

          </Link>
        ))}
    </div>
  )
}

export default HomePage;