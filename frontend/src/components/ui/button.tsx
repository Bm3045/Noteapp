import React from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...rest }) => {
  return (
    <button
      className={`
        bg-blue-600 text-white font-semibold rounded-xl px-6 py-3 text-lg
        hover:bg-blue-700 transition duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  )
}
