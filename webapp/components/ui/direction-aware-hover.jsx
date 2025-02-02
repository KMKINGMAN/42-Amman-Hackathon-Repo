"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className
}) => {
  const ref = useRef(null);

  const [direction, setDirection] = useState("left");

  const handleMouseEnter = (
    event
  ) => {
    if (!ref.current) return;

    const direction = getDirection(event, ref.current);
    console.log("direction", direction);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (
    ev,
    obj
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    (<motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "md:tw-h-96 tw-w-60 tw-h-60 md:tw-w-96 tw-bg-transparent tw-rounded-lg tw-overflow-hidden tw-group/card tw-relative",
        className
      )}>
      <AnimatePresence mode="wait">
        <motion.div
          className="tw-relative tw-h-full tw-w-full"
          initial="initial"
          whileHover={direction}
          exit="exit">
          <motion.div
            className="tw-group-hover/card:block tw-hidden tw-absolute tw-inset-0 tw-w-full tw-h-full tw-bg-black/40 tw-z-10 tw-transition tw-duration-500" />
          <motion.div
            variants={variants}
            className="tw-h-full tw-w-full tw-relative tw-bg-gray-50 dark:tw-bg-black"
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}>
            <Image
              alt="image"
              className={cn("tw-h-full tw-w-full tw-object-cover tw-scale-[1.15]", imageClassName)}
              width="1000"
              height="1000"
              src={imageUrl} />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={cn(
              "tw-text-white tw-absolute tw-bottom-4 tw-left-4 tw-z-40",
              childrenClassName
            )}>
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>)
  );
};

const variants = {
  initial: {
    x: 0,
  },

  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 20,
  },
  bottom: {
    y: -20,
  },
  left: {
    x: 20,
  },
  right: {
    x: -20,
  },
};

const textVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  top: {
    y: -20,
    opacity: 1,
  },
  bottom: {
    y: 2,
    opacity: 1,
  },
  left: {
    x: -2,
    opacity: 1,
  },
  right: {
    x: 20,
    opacity: 1,
  },
};
