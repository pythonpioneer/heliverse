// importing requirements
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user';


// configuring out redux store
export const store = configureStore({
    reducer: {
        user: userReducer
    }
});
