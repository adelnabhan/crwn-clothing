import './product-card.styles.scss'
import Button from '../button/button.component'
import { addItemToCart } from '../../store/cart/cart.action'
import { useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { useSelector } from 'react-redux'
const ProductCard = ({product}) =>{
    const {name, price, imageUrl} = product
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const addItem =() => dispatch(addItemToCart(cartItems,product))
    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <div className="name">{name}</div>
                <div className="price">{price}</div>
            </div>
            <Button onClick={addItem} buttonType={'inverted'}>Add to cart</Button>

        </div>
    )
}

export default ProductCard