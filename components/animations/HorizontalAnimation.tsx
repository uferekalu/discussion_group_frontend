import React from "react";
import { motion, Variants } from "framer-motion";

interface HorizontalAnimationProps {
  text: string;
}

const HorizontalAnimation = (props: HorizontalAnimationProps) => {
  const textVariants: Variants = {
    initial: {
      x: "10%",
    },
    animate: {
      x: "0%",
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <div>
      <motion.div
        initial="initial"
        animate="animate"
        variants={textVariants}
        style={{
          display: "flex",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        <motion.span
          style={{
            display: "inline-block",
          }}
        >
          {props.text}
        </motion.span>
      </motion.div>
    </div>
  );
};

export { HorizontalAnimation }