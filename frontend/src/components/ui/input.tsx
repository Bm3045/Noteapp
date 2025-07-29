import React from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${props.className}`}
    />
  )
}
