import type { ReactNode } from "react";

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  bgImg?: boolean;
  imgUrl?: string;
  pd?: string;
  rounded?: string;
  shadow?: string;
};

const Background = (props: IBackgroundProps) => {
  const divStyle = {
    backgroundImage: props.bgImg ? props.imgUrl : undefined,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };
  return (
    <div
      style={props.bgImg ? divStyle : undefined}
      className={`${props.color} ${props.pd ? props.pd : undefined} ${
        props.rounded ? props.rounded : undefined
      } ${props.shadow ? props.shadow : undefined}`}
    >
      {props.children}
    </div>
  );
};

export { Background };
