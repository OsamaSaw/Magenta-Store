import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import cartReducer from "./reducers/cart";
import userReducer from "./reducers/user";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// COMBINING ALL REDUCERS
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const makeStore = ({ isServer }) => {
  const persistConfig = {
    key: "shoppingcart",
    whitelist: ["cart", "user"],
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for non-serializable values
      }),
  });

  store.__persistor = persistStore(store);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
