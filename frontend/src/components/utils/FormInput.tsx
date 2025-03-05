import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
  type: string;
  placeholder?: string;
}

const FormInput = ({
  title,
  name,
  type,
  placeholder,
  ...props
}: FormInputProps) => {
  return (
    <div className="flex flex-col items-start gap-1 mt-4">
      <label htmlFor={name}>{title}</label>
      <input
        className="p-2 border-b-2 border-[#646cff] w-full focus:outline-0 bg-[#323a48]"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        {...props} // This will now correctly pass onChange, value, and other input props
      />
    </div>
  );
};

export default FormInput;
