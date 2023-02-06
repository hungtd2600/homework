import React, { FC, ReactElement, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { ToastContext } from "const/toast";

type ToastProps = {
  children: ReactElement;
};

type TMessage = {
  text: string;
  type: AlertColor;
};

type TToast = {
  isOpen: boolean;
  message?: TMessage;
};

export const ToastProvider: FC<ToastProps> = (props): ReactElement => {
  const { children } = props;

  const [state, setState] = useState<TToast>({ isOpen: false });

  const show = (message: TMessage) => {
    setState({ isOpen: true, message });
  };

  const hide = () => setState({ isOpen: false });

  const error = (message: string) => {
    show({ type: "error", text: message });
  };

  const success = (message: string) => {
    show({ type: "success", text: message });
  };

  const { isOpen, message } = state;

  return (
    <ToastContext.Provider
      value={{
        error: error,
        success: success,
        hide: hide,
      }}
    >
      {children}
      {message && (
        <Snackbar open={isOpen} autoHideDuration={2000} onClose={hide}>
          <Alert
            elevation={6}
            variant="filled"
            onClose={hide}
            severity={message.type}
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </ToastContext.Provider>
  );
};
