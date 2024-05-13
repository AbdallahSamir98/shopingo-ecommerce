import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlistFunction } from '../store/wishlist';
import { addToCartFunction } from '../store/cart';

const ProductLinksPopover = ({ linkContent, linkIcon, to }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <Link to={to}>
            <span className='cartIcon'>
              {linkIcon}
            </span>
          </Link>
        </Typography>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div>
            {/* Additional content if needed */}
          </div>
          <Typography className='tika' sx={{}}>{linkContent}</Typography>
        </Popover>
      </div>
    </div>
  );
};

const YourComponent = ({linkContent,to,linkIcon, product}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
const localStorageToken = localStorage.getItem("userToken")
const [rerender, setRerender] = useState(false);


const scrollToTop = () => {
  window.scrollTo(0, 0); 
};

const navigateToLogin = () => {
  navigate("/login");
  scrollToTop(); 
};
  const sendToCart = (productId) => {
    if(localStorageToken){

      setRerender(prevRerender => !prevRerender);
      dispatch(addToCartFunction(productId))
      


    }else{
      
      navigateToLogin()
      setRerender(prevRerender => !prevRerender);

    }
    

  }
  const sendToWishlist = (productId) => {
    if(localStorageToken){
      setRerender(prevRerender => !prevRerender);

      dispatch(addToWishlistFunction(product?.id))    
    }else{
      setRerender(prevRerender => !prevRerender);

      navigateToLogin()
      
    }
    

  }
  

  return (
    <div>
         
            <Link to={to}> {linkIcon} </Link>
           
        
        <ProductLinksPopover
          
          linkContent="View More"
          to={to}
          linkIcon={<IoEyeOutline className="productCardIcon " />}
        />
     
              
           
      
      
     
      <div className='my-1'>
        <ProductLinksPopover linkContent="Add to Wishlist" linkIcon={<CiHeart onClick={()=>
    sendToWishlist(product?.id) } className=" productCardIcon " />}  />
      </div>
      <ProductLinksPopover  linkContent="Add to Cart" linkIcon={<MdAddShoppingCart onClick={() => sendToCart(product?.id)}  className="productCardIcon " />}  />
    </div>
  );
};

export default YourComponent;
