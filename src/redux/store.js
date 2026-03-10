import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import cartReducer from './features/cartSlice'
export const store = configureStore({
    reducer: {

        cart: cartReducer,
        auth: authReducer
      
    },
})