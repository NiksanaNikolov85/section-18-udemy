import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import { currencyFormater } from "../../util/formating";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../../store/UserProgressContext";
import useHttp from "../../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: "POST",
    headers: {
        'Content-type' : 'aplication/json'
    }
}

export default function Checkout () {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    console.log(UserProgressContext.progress);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity);
       },0);

    const {data, isLoading, error, sendRequest} = useHttp('http://localhost:3000/orders', requestConfig)

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    function handleSubmit (e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));

        // fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: cartCtx.items,
        //             customer: customerData
        //         }
        //     })
        // })
        console.log(customerData, 777777)
    }

    let actions = (
        <>
         <Button textOnly type="button" onClick={handleClose}>Close</Button>
                <Button >Submit Order</Button>
        </>
    )
    if (isLoading) {
        actions = <span>Is sending ...</span>
    }

    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormater.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name"/>
        <Input label="Email" type="email" id="email"/>
        <Input label="Street" type="text" id="street"/>
        <div className="control-row"/>
        <Input label="Postal Code" type="text" id="postal-code"/>
        <Input label="City" type="text" id="city"/>
        <div>
            {error && <Error title='failed' message={error}/>}
            <p className="modal-actions">
               {actions}
            </p>
        </div>
        </form>
        </Modal>
}