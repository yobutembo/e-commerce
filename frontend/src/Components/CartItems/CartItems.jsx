import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartIems = () => {
    const {getTotalCartAmount, cartItems, all_product, removeFromCart} = useContext(ShopContext)
  return (
    <div className='cart-items'>

        <div className="cartitems-format-main">
           <p>Products</p>
           <p>Title</p>
           <p>Price</p>
           <p>Quantity</p>
           <p>Total</p>
           <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e) => {

          if(cartItems[e.id] > 0) {
            return <div>
            <div className="cartitems-format cartitems-format-main">
                <img src={e.image}  className='carticon-product-icon' alt="" />
                <p>{e.name}</p>
                <p>ZMW {e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>ZMW {e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => {removeFromCart(e.id)}} alt="remove from cart icon" />
            </div>
            <hr />
        </div>
          }
          return null
        })}

        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>ZMW {getTotalCartAmount()}</h3>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
            <div className="cartitems-promocode">
              <p>If you have a promo code, enter it here</p>
              <div className="cartitems-promobox">
                <input type="text" placeholder='Promo code' />
                <button>SUBMIT</button>
              </div>
            </div>
        </div>

    </div>
  )
}

export default CartIems