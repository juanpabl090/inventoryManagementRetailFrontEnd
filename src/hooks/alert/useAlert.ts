import { useContext } from "react";
import { AlertContext } from "../../context/alertContext/alertContext";

export default function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be inside an AlertProvider");
  }
  return context;
}
