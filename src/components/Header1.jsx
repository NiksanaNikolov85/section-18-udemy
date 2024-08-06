import logoImg from '../assets/logo.jpg';
import { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext1';

export default function Header () {
    const cartCtx = useContext(CartContext);
    console.log(cartCtx.items,6666777);
    const newCart = cartCtx.items.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0)
   
    return (
        <header id="main-header">
            <div id="title">
            <img src={logoImg} alt='A restaurant'/>
            <h1>Reactsdad food</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({newCart})</Button>
             </nav>

        </header>
    )
}