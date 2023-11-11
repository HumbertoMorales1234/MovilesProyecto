import { useContext } from "react";
import { KartContext } from "../context/KartContext";


export const useKartContext = () => useContext(KartContext)