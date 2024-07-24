import './cart-icon.styles.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCartOpen } from '../../store/cart/cart.action'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'

const CartIcon = () =>{
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () =>  dispatch(setIsCartOpen(!isCartOpen));
    return(
        <div className="cart-icon-container">
            <ShoppingIcon onClick={toggleIsCartOpen} className='shopping-icon'></ShoppingIcon>
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon