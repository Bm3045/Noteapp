import React from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, className = "", ...rest }) => {
  return (
    <label
      className={`block text-gray-600 font-medium text-sm mb-1 ${className}`}
      {...rest}
    >
      {children}
    </label>
  )
}
