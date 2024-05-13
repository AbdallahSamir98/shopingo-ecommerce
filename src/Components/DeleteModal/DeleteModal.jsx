import React from 'react'
import { deleteCart } from '../store/cart'
import { useDispatch } from 'react-redux'

const DeleteModal = () => {
 
 const dispatch =useDispatch()
    return (
    <div>
        


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <h6>

        Are you sure you want to delete all products from Cart ?
        </h6>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button
            onClick={()=>dispatch(deleteCart())}

        type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete All</button>
        
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default DeleteModal 