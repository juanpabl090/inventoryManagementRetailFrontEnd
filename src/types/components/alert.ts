export type AlertOptions = {
  title: string;
  message: string;
  type?: "Success" | "Error" | "Info" | "Warning";
};

export interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
}
