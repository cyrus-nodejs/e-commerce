import React from 'react'
import ReactDOM from 'react-dom/client'



import { FavoriteProvider } from './Context/wishlist.tsx';


import App from './App.tsx'
import {store} from "./redux/app/store.tsx"
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <FavoriteProvider>
      <Provider store={store}>
     <App /> 
     </Provider>
    
    </FavoriteProvider>
    
  </React.StrictMode>,
)


