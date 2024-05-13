import React from 'react'
import { useSelector } from 'react-redux';

const Orders = () => {
    const { cart } = useSelector((state) => state.cart);

 
    return (
    <div>Orders</div>
  )
}

export default Orders