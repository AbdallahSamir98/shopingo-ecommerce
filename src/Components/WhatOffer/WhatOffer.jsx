import React from 'react'
import "./Whatoffer.css"
const WhatOffer = () => {
    const col=[
        {header:"Free Delivery",icon:"fa-solid fa-truck-fast text-primary" ,color:" bg-primary text-primary",paragraph:"FREE Shipping is available if you're ordering eligible items for delivery "},
        {header:"Secure Payment",icon:"fa-solid fa-credit-card text-danger",color:"bg-danger text-danger" ,paragraph:"Secure Payment is available if you're ordering eligible items for Payment "},
        {header:"Free Returns ",icon:"fa-solid fa-money-bill-transfer text-success",color:"bg-success text-success", paragraph:"Free Returns is available if you're ordering eligible items for Returns "},
        {header:"24/7 Support",icon:"fa-solid fa-headset text-warning",color:"bg-warning text-warning" , paragraph:"24/7 Support is available if you're ordering eligible items for support "},
    ];

    return (
        <>
            <div className="container pb-5">
                <div className="productHeader text-center ">
                    <h2 className="my-4">What We Offer!</h2>
                    <p className="fs-5 text-muted mb-5">The Purpose Of Shopingo</p>
                </div>
                <div className="row">
                    {col.map((item, idx) => (
                        <div key={idx} className="col-md-3 text-center mt-2">
                            <div className='  offerEffect pt-3 '>
                            <i className={`${item.icon} fs-1 mt-3 `}></i>
                                <h4 className='my-3 '>{item.header}</h4>
                                <p className='text-muted px-3'>{item.paragraph}

</p>
                                <div className={item.color }>. </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default WhatOffer;
