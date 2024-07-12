import * as React from "react";
import type { SVGProps } from "react";
const SvgTestIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 27"
    {...props}
  >
    <path
      fill="#FF6BFA"
      d="m7.828.723-7.534 7.5v10.55l7.534 7.5 7.534-7.5V8.223zm3.767 16.484L7.828 20.97 4.06 17.22V9.775l3.767-3.75 3.767 3.75z"
    />
    <path fill="#FFB0FF" d="M7.828.723v5.302l3.767 3.75 3.766-1.552z" />
    <path fill="#E655D4" d="M4.06 17.22.295 18.772l7.534 7.5V20.97z" />
    <path
      fill="#FFDEF9"
      d="M4.06 9.776v7.445l3.768 3.75 3.767-3.75V9.776l-3.767-3.75z"
    />
  </svg>
);
export default SvgTestIcon;
