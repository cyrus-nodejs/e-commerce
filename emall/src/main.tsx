import React from 'react'
import ReactDOM from 'react-dom/client'
import { AddressProvider } from './Context/address.tsx';
import { OrderProvider } from './Context/order.tsx';
import { AuthProvider } from './Context/auth.tsx';
import { CartProvider } from './Context/cart';
import { FavoriteProvider } from './Context/wishlist';
import { CookiesProvider } from 'react-cookie';
import  {ItemProvider} from "./Context/items.tsx"
import { CheckoutProvider } from './Context/checkout.tsx';
import App from './App.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
   <AuthProvider >
      <CartProvider>
      <FavoriteProvider>
        <ItemProvider>
      <CookiesProvider>
        <CheckoutProvider>
          <OrderProvider>
            <AddressProvider>
     <App /> 
     </AddressProvider>
     </OrderProvider>
     </CheckoutProvider>
    </CookiesProvider>,
    </ItemProvider>
    </FavoriteProvider>
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)


