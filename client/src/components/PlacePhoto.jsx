import { useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import Image from "./Image";

//Detail page of place photos (when click show more photos in place bookings)

const PlacePhoto = ({place}) => {
    const [showMorePhoto, setShowMorePhoto] = useState(false);

    if (showMorePhoto) {
        return (
          <div className="absolute inset-0 bg-black h-screen text-white z-20">
            <div className="md:px-32 px-4 grid gap-4 bg-black">
              <div >
                <h2 className="text-lg md:text-3xl my-8">{place.title}</h2>
                <button
                  onClick={() => setShowMorePhoto(false)}
                  className="flex text-sm items-center gap-1 py-2 px-4 rounded-2xl bg-white text-black fixed shadow shadow-black right-4 top-8"
                >
                  <RxCross2 />
                  Close Photos
                </button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map((photo) => (
                  <div className="md:px-32 md:py-4">
                    <Image
                      src={photo}
                      alt="place/photos"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
            </div>
          </div>
        );
      }
  return (
    <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div className="">
            {place.photos?.[0] && (
              <div className="">
                <Image
                  onClick={() => setShowMorePhoto(true)}
                  src={place.photos[0]}
                  alt="home photos"
                  className="object-cover cursor-pointer h-[300px] w-full"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <Image
                onClick={() => setShowMorePhoto(true)}
                src={place.photos[1]}
                alt="home photos"
                className="object-cover cursor-pointer h-[150px] w-full"
              />
            )}
            <div className="grid">
              {place.photos?.[2] && (
                <Image
                  onClick={() => setShowMorePhoto(true)}
                  src={place.photos[2]}
                  alt="home photos"
                  className="object-cover relative top-2 cursor-pointer h-[150px] w-full"
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowMorePhoto(true)}
          className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md flex items-center gap-2"
        >
          <HiOutlinePhotograph className="w-6 h-6" />
          <span className="text-xs md:text-lg">Show More Photos</span>
        </button>
      </div>
  )
}

export default PlacePhoto