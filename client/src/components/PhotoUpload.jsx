import axios from "axios";
import { useState } from 'react';
import { BiCloudUpload, } from "react-icons/bi";
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import Image from "./Image";




const PhotoUpload = ({photo, OnChange}) => {
    const [photoLink, setPhotoLink] = useState("");

      async function uploadPhoto(e){
        e.preventDefault();
        const files = e.target.files;
        const data = new FormData();
        for (let i=0; i < files.length; i++){
          data.append('photos', files[i]);  
        }  
        axios.post('/uploads', data, {
          headers: {'Content-type': 'multipart/form-data' }
        }).then(response => {
          const {data:filenames} = response;
          OnChange((prev) => {
            return [...prev, ...filenames];
          });
        })
      };
  
const removePhoto = (e,delLink) => {
  e.preventDefault();
  OnChange([...photo.filter(addedphoto => addedphoto !== delLink)]);
};

const selectMainPhoto = (e,currentPhoto) => {
  e.preventDefault();
  const NotMainPhoto = photo.filter(photo => photo !== currentPhoto);
  const newMainPhoto = [currentPhoto, ...NotMainPhoto];    //apply rest parameter
  OnChange(newMainPhoto);
}

  return (
    <>
   
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-3 text-xl text-gray-600">
              {photo.length > 0 &&
                photo.map((link) => (
                  <div className="h-32 flex relative" key={link}>
                    <Image
                      className="rounded-2xl w-full"
                      src={link}
                      alt="photos"
                    />
                    <button onClick={(e)=>removePhoto(e,link)} className="absolute bottom-1 right-1 text-white bg-black p-1 bg-opacity-50 rounded-xl cursor-pointer">
                      <BsTrash/>
                    </button>
                    <button onClick={(e)=>selectMainPhoto(e,link)} className="absolute bottom-1 left-1 text-white bg-black p-1 bg-opacity-50 rounded-xl cursor-pointer">
                      {link === photo[0] && (
                        <AiFillStar/>
                      )}
                      {link !== photo[0] && (
                        <AiOutlineStar />
                      )}
                    </button>
                  </div>
                ))}
              <label className="flex justify-center items-center gap-3 border p-2 rounded-xl bg-transparent cursor-pointer">
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                <BiCloudUpload className="w-8 h-8" />
                Grab Photo Here
              </label>
            </div>
            </>
  )
}

export default PhotoUpload