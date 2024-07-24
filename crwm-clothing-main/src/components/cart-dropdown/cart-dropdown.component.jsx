import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'


const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigation = useNavigate()
    const navie = () =>{
        navigation('./checkout')
    }
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => <CartItem key={item.id} cartItem={item}></CartItem>)}
            </div>
            <Button onClick={navie}>GO TO CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown