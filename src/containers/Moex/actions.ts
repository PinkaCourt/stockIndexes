import { createAction } from "@reduxjs/toolkit";
import * as T from "./types";

export const getMoexStoks = createAction("getMoexStoks");

export const setStoksMap = createAction<T.StokMap>("setStoksMap");
