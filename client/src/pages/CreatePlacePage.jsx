import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AccountNavbar, Options, PhotoUpload } from "../components";
import { useEffect } from "react";

const CreatePlacePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(50);
  const [redirectTo, setRedirectTo] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos);
      setDescription(data.description);
      setOptions(data.options);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuest);
      setPrice(data.price);
    });
  }, [id]);

  async function addNewPlace(e) {
    e.preventDefault();
    const placeInfo = {
      title,
      address,
      photos,
      description,
      options,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price
    };

    if (id) {
      await axios.put("/places", {
        id,
        ...placeInfo
      });
      setRedirectTo(true);
    } else {
    await axios.post("/places", placeInfo);
    setRedirectTo(true);
  };
};
  if (redirectTo) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNavbar />
      <form onSubmit={addNewPlace}>
        <h2 className="text-xl font-semibold mt-4">Title</h2>
        <input
          type="text"
          placeholder="title, eg:My apartment or place"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-xl font-semibold mt-4">Address</h2>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <h2 className="text-xl font-semibold mt-4">Photos</h2>
        <PhotoUpload photo={photos} OnChange={setPhotos} />
        <h2 className="text-xl font-semibold mt-4">Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2 className="tex-xl font-semibold mt-4">Options</h2>
        <Options selected={options} OnChange={setOptions} />
        <h2 className="text-xl font-semibold mt-4">Extra Info</h2>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-xl font-semibold mt-4">Check In & Out time</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
          <div>
            <h3>Check In time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3>Check Out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3>Maximum Number of guests</h3>
            <input
              type="number"
              placeholder="1"
              value={maxGuest}
              onChange={(e) => setMaxGuest(e.target.value)}
            />
          </div>
          <div>
            <h3>Price/Night</h3>
            <input type="number"
                   placeholder="$50"
                   value={price}
                   onChange={(e)=> setPrice(e.target.value)} />
          </div>
        </div>
        <div className="">
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlacePage;
