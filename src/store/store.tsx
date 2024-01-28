import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./slice/pizzSLice";

export const store = configureStore({
  reducer: {
    pizzaReducer: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
