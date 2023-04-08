import React from 'react'
import { Link } from 'react-router-dom';




const MenuItems = ({link, label}) => {
  return (
    <Link
    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
    to={link}>
        {label}
        </Link>
  )
}

export default MenuItems;