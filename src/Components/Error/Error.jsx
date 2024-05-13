import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
         <div className='d-flex flex-column my-5 py-5  align-items-center justify-content-center '>
        
        <h2 className='text-danger'>ERROR 404 </h2>
        <h5>That Page Can’t be found!</h5>
        <p className='text-muted '>It looks like nothing was found at this location.</p>
        <Link to='/home' className='btn btn-danger'>back to home</Link>
    </div>
    </div>
  )
}

export default Error