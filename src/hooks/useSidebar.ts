import { useState } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    isOpen,
    setIsOpen,
  };
};
