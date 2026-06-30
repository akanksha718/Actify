"use client";

import { createContext, useContext } from "react";

interface XPContextType {
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
}

export const XPContext = createContext<XPContextType | null>(null);

export const useXP = () => {
  const context = useContext(XPContext);

  if (!context) {
    throw new Error("useXP must be used inside XPProvider");
  }

  return context;
};