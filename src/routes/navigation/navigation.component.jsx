import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'
import { selecCurrentUser } from "../../store/user/user.selector"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../context/cart.context"
import { useSelector } from "react-redux"
const Navigation = ()=> {
    const currentUser = useSelector(selecCurrentUser)
    const {isCartOpen} = useContext(CartContext);

    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo"></CrwnLogo>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {currentUser?<Link onClick={signOutUser} className="nav-link">
                    SIGN OUT
                </Link>:<Link className="nav-link" to='/auth'>
                    SIGN IN
                </Link>}
                <CartIcon> </CartIcon>

             </div>
            {isCartOpen && <CartDropdown />}

            </div>
          <Outlet/>
      </Fragment>
    )
}

export default Navigation