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
};

const Section = (props: ISectionProps) => (
  <div
    className={`${props.width} ${props.height} ${
      props.yPadding ? props.yPadding : "py-16"
    } ${props.xPadding ? props.xPadding : "px-3"} shadow-lg 
    } ${props.fixed ? props.fixed : undefined}`}
  >
    {(props.title || props.description) && (
      <div
        className={`mb-12 text-center ${
          props.marginTop ? props.marginTop : undefined
        } rounded-xl shadow-md p-6`}
      >
        {props.title && (
          <h2 className="sm:text-2xl text:xl font-bold text-gray-900">{props.title}</h2>
        )}
        {props.description && (
          <div className="mt-4 smtext-md text:sm md:pd-20 sm:font-semibold text-gray-900">{props.description}</div>
        )}
      </div>
    )}
    {props.children}
  </div>
);

export { Section };
