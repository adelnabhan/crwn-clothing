import './checkout-item.styles.scss'
import { useSelector,useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart,clearItemFromCart,removeItemFromCart } from '../../store/cart/cart.action'
const CheckOutItem = ({cartItem})=>{
   
    const {name, imageUrl, price, quantity} = cartItem
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={() => dispatch(removeItemFromCart(cartItems,cartItem))} className="arrow">&#10094;</div>
                <span className="value">{quantity}</span>
                <div onClick={() => dispatch(addItemToCart(cartItems,cartItem))} className="arrow">&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className="remove-button" onClick={() => dispatch(clearItemFromCart(cartItems,cartItem))}>&#10005;</div>
        </div>
    )

}

export default CheckOutItem