import { remove } from "lodash";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductType = {
  id: string;
  name: string;
  price: string;
  count: number;
  color: string;
  size: string;
};

type ToggleFavType = {
  id: string;
};

interface UserSliceTypes {
  user: string;
  favProducts: any;
}

const initialState = {
  user: "",
  favProducts: [],
} as UserSliceTypes;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFavProduct(state, action: PayloadAction<ToggleFavType>) {
      const index = state.favProducts.includes(action.payload.id);

      if (!index) {
        state.favProducts.push(action.payload.id);

        return;
      }

      remove(state.favProducts, (id) => id === action.payload.id);
    },
    setUserLogged(state, action: PayloadAction<ProductType>) {
      const index = state.favProducts.includes(action.payload.id);

      if (!index) {
        state.favProducts.push(action.payload.id);

        return {
          ...state,
          favProducts: state.favProducts,
        };
      }

      remove(state.favProducts, (id) => id === action.payload.id);

      return {
        ...state,
        favProducts: state.favProducts,
      };
    },
    loginUserName(state, action: PayloadAction<string>) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const { toggleFavProduct, setUserLogged, loginUserName } =
  userSlice.actions;
export default userSlice.reducer;
