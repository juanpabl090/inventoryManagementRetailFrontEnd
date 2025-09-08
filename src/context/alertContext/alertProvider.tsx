import { AlertContext } from "./alertContext";
import { useState, type ReactNode } from "react";
import type { AlertOptions } from "../../types/components/alert";
import Alert from "../../components/Alert";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showAlert = (options: AlertOptions) => {
    setAlert(options);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && isOpen && (
        <Alert
          title={alert.title}
          message={alert.message}
          onClose={handleClose}
          isOpen={isOpen}
          type={alert.type}
        />
      )}
    </AlertContext.Provider>
  );
};
