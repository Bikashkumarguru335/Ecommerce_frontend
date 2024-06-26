import React, { Fragment } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/metaData'
import "./confirmOrder.css"
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'


const ConfirmOrder = () => {
    const cartItems=useSelector((state)=>state.cart?.cartItems)
    const navigate=useNavigate();
     console.log(cartItems)
    //  console.log(cartItems.map((item)=>console.log(item.product)))
    //    const cartItems=cartItem.map((item)=>console.log(item.product))
    //    console.log(cartItems)
    const user=useSelector((state)=>state.userDetails?.user)
    const shippingInfo=useSelector((state)=>state.shipping?.shippingInfo)
    
const subtotal=cartItems.reduce((acc,item)=>acc+item.quantity*item.product?.price,0)

const shippingCharges=subtotal >1000 ?0:100;
const tax=subtotal*0.18;
const totalPrice=subtotal+tax+shippingCharges;

const proceedToPayment=()=>{
    const data={
        subtotal,
        shippingCharges,
        tax,
        totalPrice
    }
    sessionStorage.setItem("orderInfo",JSON.stringify(data))
    navigate("/process/payment")
}

  return (
    <Fragment>
        <MetaData title="Confirm Order"/>
        <CheckoutSteps activeStep={1}/>
        <div className='confirmOrderPage'>
            <div>
            <div className='confirmShippingArea'>
                <Typography>Shipping Info</Typography>
                <div className='confirmShippingAreaBox'>
                    <div>
                        <p>Name:</p>
                        <span>{user.name}</span>
                    </div>
                     <div>
                        <p>Phone:</p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div> 
                    <div>
                        <p>Address:</p>
                        <span>{`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`}</span>
                    </div>
                    </div>
                    </div>
                    <div className='confirmCartItems'>
                        <Typography>Your Cart Items:</Typography>
                        <div className='confirmCartItemContainer'>
                            {cartItems && cartItems.map((item)=>(
                                
                                <div key={item.product?.id}>
                                    <img src={item.product?.image} alt="Product"/>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                    
                                    <span>
                                        {item.quantity}X ₹{item.product?.price}={" "}
                                        <b>₹{item.product?.price*item.quantity}</b>
                                    </span>
                                </div>
                                ))}
                        </div>
                    </div>
            </div>
            
        
            <div>
                <div className='orderSummary'>
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>
                        </div>
                    </div>
                    <div className='orderSummaryTotal'>
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>₹{totalPrice}</span>
                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>
            </div>
    </Fragment>
  )
}

export default ConfirmOrder;