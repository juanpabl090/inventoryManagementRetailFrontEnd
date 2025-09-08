import { createContext } from "react";
import type { AlertContextType } from "../../types/components/alert";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);
