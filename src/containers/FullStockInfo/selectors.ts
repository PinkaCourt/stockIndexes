import { RootState } from "store/store";

export const selectStockProfile = (state: RootState) => state.stockProfile.full;
