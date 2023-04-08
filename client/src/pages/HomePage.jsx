
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image } from '../components';


const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [isloading,setIsloading] = useState(true);

  useEffect(()=>{
    axios.get('/places').then(response => {
      setPlaces(response.data);
      setIsloading(false);
    });
  },[]);

  if(isloading){
    return 'loading...';
  };

  
  return (
    <div className='grid mt-12 gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {places.length > 0 && places.map(place => (
          <Link to={'place/' + place._id} className='' key={place._id}>
            <div className='bg-gray-500 rounded-2xl flex mb-3 overflow-hidden' >
            {place.photos?.[0] && (
            <Image className='rounded-2xl object-cover hover:scale-105 aspect-square transition-transform duration-500 ease-in-out'
                src={place.photos?.[0]} 
                alt="Places" /> )}
            </div>
            <h3 className='font-bold text-xs'>{place.address}</h3>
            <h2 className='text-sm truncate text-gray-500 '>{place.title}</h2>
            <div className='text-sm font-semibold mt-1'
            >
              ${place.price}<span className='font-medium text-xs'>/night</span>
            </div>

          </Link>
        ))}
    </div>
  )
}

export default HomePage;