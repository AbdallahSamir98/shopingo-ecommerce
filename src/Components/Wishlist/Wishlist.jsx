import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromWishlist, fetchWishlistFunction } from '../store/wishlist';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { MdAddShoppingCart } from 'react-icons/md';
import { Toast } from 'bootstrap';
import { Toaster } from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { addToCartFunction } from '../store/cart';

const Wishlist = () => {
  const { wishlist, loading, error, isRequiredRender } = useSelector(
    (state) => state.wishlist
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlistFunction());
  }, [dispatch, isRequiredRender]);
  const sendToCart = (productId) => {
    dispatch(addToCartFunction(productId))
    console.log(productId,"id");

  }

return (
    <>
     {loading && (
        <div>
          <Loading />
        </div>
      )}
          <Toaster position="top-center" />
          <div className="cartInfo mt-5   text-center">
   <h2>Wishlist</h2>
 </div>
 {wishlist?.length === 0  ? 
  <div className=" ">
  <div className="productContent  text-center p-5">
    <i className="fa-solid fa-love ms-2 fs-1 cart mb-2 text-danger"></i>
    <CiHeart  className=" ms-2 fs-1 cart mb-2 text-danger"/>
    <h5 className="">There is no Products !</h5>
    <Link className="text-primary" to="/home">
      back to home
    </Link>
  </div>
</div>
 :<>

 <TableContainer className='container' >
   <Table>
     <TableHead>
       <TableRow>
       <TableCell style={{ fontWeight: 'bold' ,fontSize:"1rem"}}>Product</TableCell>
<TableCell style={{ fontWeight: 'bold' ,fontSize:"1rem"}}></TableCell>
<TableCell style={{ fontWeight: 'bold' ,fontSize:"1rem"}}>Price</TableCell>
<TableCell style={{ fontWeight: 'bold' ,fontSize:"1rem"}}>Add to Cart</TableCell>
<TableCell style={{ fontWeight: 'bold' ,fontSize:"1rem"}}>Remove</TableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {wishlist.map((product, idx) => (
         <TableRow  key={idx}>
           <TableCell>
             <img src={product.imageCover} alt="wishlist image" style={{width:"150px"}} />
           </TableCell>
           <TableCell>
             <h5>{product.title}</h5>
           </TableCell>
           <TableCell  className='fs-5'> 
               ${product.price}
               </TableCell>
           <TableCell>
             <MdAddShoppingCart
onClick={()=>
sendToCart(product.id)}
             style={{cursor:"pointer"}} className='fs-1 text-success'/>
           </TableCell>
           <TableCell>
           <i
                    onClick={() =>
                       dispatch(deleteFromWishlist(product?._id))
                     }
                     className="fa-regular fa-trash-can  fs-3 text-danger cursor-pointer	X"
                   ></i>                </TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
</>}
    </>
  );
};

export default Wishlist;
