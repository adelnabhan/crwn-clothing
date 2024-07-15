import './checkout.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import CheckOutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () =>{
    const {removeCartItem, cartItems, addItemToCart, decrementCartItem, cartTotal} = useContext(CartContext)
    return(
        <div className='checkout-container'>
            <div className="checkout-header">
                <div className="header-block"><span>Product</span></div>
                <div className="header-block"><span>Description</span></div>
                <div className="header-block"><span>Quantity</span></div>
                <div className="header-block"><span>Price</span></div>
                <div className="header-block"><span>Remove</span></div>
            </div>
            {cartItems.map((cartItem) =>
               <CheckOutItem key={cartItem.id} addItemToCart={addItemToCart} decrementCartItem={decrementCartItem} removeCartItem={removeCartItem} cartItem={cartItem}/>
               
            )}
            <span className="total">{cartTotal}</span>
        </div>
    )
}

export default Checkout