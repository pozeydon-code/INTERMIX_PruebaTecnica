import { useContext } from "react";
import { createContext } from "react";

export const DialogContext = createContext();

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialogContext must be used within a DialogContext");
  }
  return context;
};
