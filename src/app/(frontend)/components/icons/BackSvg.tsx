import * as React from 'react'
import { SVGProps } from 'react'
const BackSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      fill="#091638"
      d="M14.857 8a.762.762 0 0 0-.762-.762H3.744l4.033-4.032a.763.763 0 0 0-1.078-1.079L1.366 7.461a.762.762 0 0 0 0 1.078l5.333 5.333a.763.763 0 0 0 1.078-1.078L3.744 8.762h10.351c.421 0 .762-.342.762-.762Z"
    />
    <path
      stroke="#fff"
      d="M14.857 8a.762.762 0 0 0-.762-.762H3.744l4.033-4.032a.763.763 0 0 0-1.078-1.079L1.366 7.461a.762.762 0 0 0 0 1.078l5.333 5.333a.763.763 0 0 0 1.078-1.078L3.744 8.762h10.351c.421 0 .762-.342.762-.762Z"
    />
  </svg>
)
export default BackSvg
