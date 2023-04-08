import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {AiOutlineProfile} from 'react-icons/ai';
import {BsBookmarkPlus} from 'react-icons/bs';
import {MdOutlinePlace} from 'react-icons/md';
import { AccountNavbar } from '../components';

const ProfilePage = () => {
    const {IsLoggedIn, user,setUser} = useContext(UserContext);
    const [toHomePage, setToHomePage] = useState(null);
    let {subpage} = useParams();

    async function logout() {
        await axios.post('/logout');
        setToHomePage('/');
        setUser(null);
    }
   

    if(toHomePage) {
        return <Navigate to={toHomePage}/>
    }

    if(!IsLoggedIn){
        return 'Loading...'
    }

    if (IsLoggedIn && !user) {
        return <Navigate to={'/login'}/>
    };

    if(subpage === undefined){
        subpage = 'profile';
    }


    return (
        <div>
            <AccountNavbar/>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name}<br/>
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}
        </div>
  )
}

export default ProfilePage;