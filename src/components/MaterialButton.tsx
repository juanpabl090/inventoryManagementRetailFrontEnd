import {
  Button,
  type ButtonProps as MaterialButtonProps,
} from "@material-tailwind/react";
import type { ReactNode } from "react";

type CustomButtonProps = {
  children?: ReactNode;
  noDefaultStyles?: boolean;
} & MaterialButtonProps;

export default function MaterialButton({
  variant = "solid",
  size = "md",
  className = "",
  noDefaultStyles = false,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`
        ${noDefaultStyles ? "" : ""} 
        ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
