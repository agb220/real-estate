import * as React from 'react'
import { SVGProps } from 'react'
const ArrowSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={16} fill="none" {...props}>
    <path
      fill="#fff"
      d="M.585 1.377 7.6 7.999.584 14.622a.776.776 0 0 0 0 1.142.894.894 0 0 0 1.21 0L9.417 8.57a.775.775 0 0 0 0-1.142L1.795.236a.895.895 0 0 0-1.212 0 .775.775 0 0 0 .002 1.14Z"
    />
  </svg>
)
export default ArrowSvg
