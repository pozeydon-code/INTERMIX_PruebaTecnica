import { useState } from "react";
import { DialogContext } from "./DialogContext";

export function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        isModalOpen,
        setIsModalOpen,
        setIsOpen,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
