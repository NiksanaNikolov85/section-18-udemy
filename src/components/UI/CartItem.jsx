import { currencyFormater } from "../../util/formating"
export default function CartItem ({name, quantity, price, onIncrease, onDecrease}) {
    return (<li className="cart-item">
        <p> {name} - {quantity} x {currencyFormater.format(price)}</p>
        <p className="cart-item-actions">
        <button onClick={onIncrease}> + </button>
        <span>{quantity}</span>
        <button onClick={onDecrease}> - </button>
        </p>
    </li>)
}