import { X } from "lucide-react";
import { useEffect } from "react";

interface CardProps {
  title: string;
  message: string;
  type?: "Success" | "Error" | "Info" | "Warning";
  isOpen?: boolean;
  onClose: () => void;
}

const variantClasses = {
  Success: {
    color: "#10b981",
    type: "mt-1.5 text-xl font-bold text-[#66cdaa] leading-8 mr-3",
    title: "leading-5 text-neutral-600 font-bold",
    message: "leading-5 text-neutral-500",
  },
  Error: {
    color: "#ef4444",
    type: "mt-1.5 text-xl font-bold text-[#ef4444] leading-8 mr-3",
    title: "leading-5 text-neutral-600",
    message: "leading-5 text-neutral-500",
  },
  Info: {
    color: "#3b82f6",
    type: "mt-1.5 text-xl font-bold text-[#3b82f6] leading-8 mr-3",
    title: "leading-5 text-neutral-600",
    message: "leading-5 text-neutral-500",
  },
  Warning: {
    color: "#f97316",
    type: "mt-1.5 text-xl font-bold text-[#f97316] leading-8 mr-3",
    title: "leading-5 text-neutral-600",
    message: "leading-5 text-neutral-500",
  },
};

export const Alert = ({
  title,
  message,
  isOpen,
  type = "Success",
  onClose,
}: CardProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  const styles = variantClasses[type ?? "Success"];
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-4 right-4 z-50 flex w-auto max-w-xs bg-white rounded-xl shadow-lg"
    >
      <svg width={16} height={96} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 8 0 
             Q 4 4.8, 8 9.6 
             T 8 19.2 
             Q 4 24, 8 28.8 
             T 8 38.4 
             Q 4 43.2, 8 48 
             T 8 57.6 
             Q 4 62.4, 8 67.2 
             T 8 76.8 
             Q 4 81.6, 8 86.4 
             T 8 96 
             L 0 96 
             L 0 0 
             Z"
          fill={styles.color}
          stroke={styles.color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      <div className="mx-2.5 auto">
        <p className={styles.type}>{type}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
      </div>
      <button
        className="w-16 cursor-pointer focus:outline-none"
        onClick={onClose}
      >
        <X className={styles.type} />
      </button>
    </div>
  );
};

export default Alert;
