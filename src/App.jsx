import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/UI/Cart';
import Redux from '../src/redux';
import Redux1 from '../src/redux1';
import { CartContextProvider } from './store/CartContext';
import {UserProgressContextProvider} from './store/UserProgressContext';
import Checkout from './components/UI/Checkout';

function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header></Header>
      <Meals></Meals>
      <Cart></Cart>
      <Checkout></Checkout>
      {/* <Redux1></Redux1> */}
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
