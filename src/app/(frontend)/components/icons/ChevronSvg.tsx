import * as React from 'react'
import { SVGProps } from 'react'
const ChevronSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" {...props}>
    <path
      fill="#889E9D"
      d="m18.623 8.085-6.622 7.016-6.623-7.017a.776.776 0 0 0-1.142 0 .894.894 0 0 0 0 1.21l7.193 7.622a.775.775 0 0 0 1.142 0l7.193-7.621a.895.895 0 0 0 0-1.212.775.775 0 0 0-1.14.002Z"
    />
  </svg>
)
export default ChevronSvg
