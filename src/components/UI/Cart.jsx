import { useContext } from 'react';
import Modal from './Modal';
import CartItem from './CartItem';
import CartContext from '../../store/CartContext';
import { currencyFormater } from '../../util/formating';
import Button from './Button';
import UserProgressContext from '../../store/UserProgressContext';

export default function Cart() {
   const cartCtx = useContext(CartContext);
   const userCtx = useContext(UserProgressContext)

   const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + (item.price * item.quantity);
   },0);

   function handleCloseCart () {
    userCtx.hideCart();
   }

   function showCheckoutCart () {
    userCtx.showCheckout()
   }
    
    return <Modal className="cart" open={userCtx.progress === 'cart'} onClose={userCtx.progress==='cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => {
                return <CartItem
                 key={item.id}
                 name={item.name}
                 quantity={item.quantity}
                 price={item.price}
                 onIncrease={() => cartCtx.addItem(item)}
                 onDecrease={() => cartCtx.removeItem(item.id)}/>
            })}
        </ul>
        <p className='cart-total'>{currencyFormater.format(cartTotal)}</p>
        <p className='modal-actions'>
        <Button onClick={handleCloseCart} textOnly>Close</Button>
        {cartCtx.items.length > 0 ? <Button onClick={showCheckoutCart}>Go to Checkout</Button> :null}
        </p>
    </Modal>


}
