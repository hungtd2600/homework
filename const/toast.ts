import React, { useContext } from "react";

type TToastContext = {
  error: Function;
  success: Function;
  hide: Function;
};

export const ToastContext = React.createContext<TToastContext>({
  error: (e: string) => e,
  success: (e: string) => e,
  hide: (e:string) => e,
});

export const useToast = () => useContext(ToastContext);
