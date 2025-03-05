import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  primary,
  loading,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg transition duration-300 shadow hover:shadow-md cursor-pointer";
  const primaryStyles = "bg-indigo-500 text-white hover:bg-indigo-800";
  const secondaryStyles =
    "text-indigo-500 hover:bg-gray-300 hover:text-black border border-indigo-500";

  const finalClassName = `${baseStyles} ${
    primary ? primaryStyles : secondaryStyles
  } ${className ?? ""}`;

  return (
    <button className={finalClassName} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
