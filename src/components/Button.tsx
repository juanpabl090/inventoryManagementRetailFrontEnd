// components/Button.tsx
import type { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  type: "submit" | "button" | "reset" | undefined;
};

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "solid",
  size = "md",
  type = "submit",
}: ButtonProps) => {
  // Configuración de estilos base
  const baseClasses =
    "rounded-md font-medium transition-colors focus:outline-none";

  // Variantes
  const variantClasses = {
    solid: "bg-primary-500 hover:bg-primary-600 text-white",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "text-primary-500 hover:bg-primary-50",
  };

  // Tamaños
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};
