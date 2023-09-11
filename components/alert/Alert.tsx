import React, { useState, useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";

interface IAlert {
  open: boolean;
  text: string;
  onClose: () => void;
}

const AlertDismissible: React.FC<IAlert> = ({ open, text, onClose }) => {
  const [btn, setBtn] = useState<boolean>(false);

//   useEffect(() => {
//     function showButton() {
//       setTimeout(() => {
//         setBtn(open ? true : false);
//       }, 100);
//     }
//     showButton();
//   }, [open]);

  return (
    <div
      style={{
        display: "block",
        background: "black",
        position: "absolute",
        top: 100,
        right: 20,
        width: "200px",
        fontSize: "13px",
        borderRadius: "6px",
      }}
    >
      <Alert open={open} onClose={onClose}>
        {text}
      </Alert>
      {open && (
        <Button
          onClick={onClose}
          className={`-mt-12 float-right text-white ease-out duration-300 ${
            open ? "block" : "hidden"
          }`}
        >
          {"x"}
        </Button>
      )}
    </div>
  );
};

export default AlertDismissible;
