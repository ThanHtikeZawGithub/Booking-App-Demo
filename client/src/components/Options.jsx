import React from "react";
import {
    AiOutlineWifi,
    AiFillCar,
    AiOutlineFundProjectionScreen,
  } from "react-icons/ai";
import { MdOutlinePets } from "react-icons/md";
import { BsDoorClosed } from "react-icons/bs";



const Options = ({selected,OnChange}) => {
  function handleCbClick(e){
    const {checked, name} = e.target;
    if (checked) {
    OnChange([...selected, name])
  }else {
    OnChange([...selected.filter(selectedName=> selectedName !== name)]);
  }
}
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      <label className="border p-4 flex rounded-2xl gap-2 items-center mt-2">
        <input type="checkbox" checked={selected.includes('wifi')} name='wifi' onChange={handleCbClick} />
        <span className="flex items-center gap-2">
          <AiOutlineWifi className="w-8 h-8" />
          Wifi
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center mt-2">
        <input type="checkbox" checked={selected.includes('parking')} name='parking' onChange={handleCbClick} />
        <span className="flex items-center gap-2">
          <AiFillCar className="w-8 h-8" />
          Free Parking
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center mt-2">
        <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={handleCbClick} />
        <span className="flex items-center gap-2">
          <AiOutlineFundProjectionScreen className="w-8 h-8" />
          TV
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center mt-2">
        <input type="checkbox" checked={selected.includes('pets')} name='pets' onChange={handleCbClick} />
        <span className="flex items-center gap-2">
          <MdOutlinePets className="w-8 h-8" />
          Pets
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center mt-2">
        <input type="checkbox" checked={selected.includes('entrance')} name='entrance' onChange={handleCbClick} />
        <span className="flex items-center gap-2">
          <BsDoorClosed className="w-8 h-8" />
          Private entrance
        </span>
      </label>
    </div>
  );
};

export default Options;
