import { useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const PlacePhoto = ({place}) => {
    const [showMorePhoto, setShowMorePhoto] = useState(false);

    if (showMorePhoto) {
        return (
          <div className="absolute inset-0 min-h-screen bg-black text-white">
            <div className="p-8 grid gap-4 bg-black">
              <div>
                <h2 className="text-3xl">{place.title}</h2>
                <button
                  onClick={() => setShowMorePhoto(false)}
                  className="flex items-center gap-1 py-2 px-4 rounded-2xl bg-white text-black fixed shadow shadow-black right-10 top-8"
                >
                  <RxCross2 />
                  Close Photos
                </button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map((photo) => (
                  <div>
                    <img
                      src={`http://localhost:4000/uploads/${photo}`}
                      alt="place/photos"
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
          <div>
            {place.photos?.[0] && (
              <div className="">
                <img
                  onClick={() => setShowMorePhoto(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt="home photos"
                  className="object-cover aspect-square cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowMorePhoto(true)}
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt="home photos"
                className="object-cover aspect-square cursor-pointer"
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowMorePhoto(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt="home photos"
                  className="object-cover aspect-square relative top-2 cursor-pointer"
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
          <span>Show More Photos</span>
        </button>
      </div>
  )
}

export default PlacePhoto