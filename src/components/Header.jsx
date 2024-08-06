import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import { useContext } from 'react';
import UserProgressCtx from '../store/UserProgressContext';

export default function Header () {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressCtx);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    function handleShowCart () {
        userCtx.showCart();
    }
    return (<header id="main-header">
        <div id="title">
            <img src={logoImg} alt='A restaurant'/>
            <h1>Order food</h1>
        </div>
        <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
        </nav>
        </header>)
};