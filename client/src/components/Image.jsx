import React from 'react'

const Image = ({src,...rest}) => {
     src = src && src.includes('firebasestorage') ? src : 'http://localhost:4000/uploads/' + src;
  return (
    <img {...rest} src={src} alt='Image' />
  )
}

export default Image