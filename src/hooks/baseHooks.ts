import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useTypeDispatch = () => useDispatch<AppDispatch>();
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
