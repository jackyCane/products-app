import {ReactNode} from "react";

type Props = {
  children: ReactNode;
  condition: boolean;
};

export const Modal = ({children, condition}: Props) => {
  return (
    <div
      className={`absolute bg-black ${
        condition ? "bg-opacity-40" : "opacity-0"
      } w-full h-full border-2 top-0 left-0 flex justify-center items-center`}
    >
      {children}
    </div>
  );
};
