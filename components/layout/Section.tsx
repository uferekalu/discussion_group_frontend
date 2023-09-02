import type { ReactNode } from "react";

type ISectionProps = {
  width: string;
  height: string;
  title?: string;
  description?: string;
  yPadding?: string;
  xPadding?: string;
  shadow?: string;
  children: ReactNode;
  marginTop?: string;
  fixed?: string;
  customBg?: string;
};

const Section = (props: ISectionProps) => (
  <div
    className={`${props.width} ${props.height} ${
      props.yPadding ? props.yPadding : "py-16"
    } ${props.xPadding ? props.xPadding : "px-3"} shadow-lg 
    } ${props.fixed ? props.fixed : undefined} `}
  >
    {(props.title || props.description) && (
      <div
        className={`mb-4 text-center ${
          props.marginTop ? props.marginTop : undefined
        } ${
          props.customBg ? props.customBg : undefined
        } rounded-xl shadow-md p-2`}
      >
        {props.title && (
          <h2 className="text:sm font-bold text-black">
            {props.title}
          </h2>
        )}
        {props.description && (
          <div className="mt-1 sm:text-sm text:xs md:pd-20 sm:font-semibold font-normal text-black">
            {props.description}
          </div>
        )}
      </div>
    )}
    {props.children}
  </div>
);

export { Section };
