import * as React from 'react'
import { SVGProps } from 'react'
const SearchSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={29} fill="none" {...props}>
    <path
      fill="#fff"
      d="M12.808 4.5C7.95 4.5 4 8.451 4 13.308c0 4.856 3.951 8.807 8.808 8.807 4.856 0 8.807-3.95 8.807-8.807S17.665 4.5 12.808 4.5Zm0 15.99c-3.96 0-7.182-3.223-7.182-7.182 0-3.96 3.222-7.182 7.182-7.182 3.96 0 7.181 3.222 7.181 7.182 0 3.96-3.222 7.181-7.181 7.181Z"
    />
    <path
      fill="#fff"
      d="M23.762 23.112 19.1 18.451a.813.813 0 1 0-1.15 1.15l4.662 4.66a.81.81 0 0 0 1.15 0 .813.813 0 0 0 0-1.149Z"
    />
  </svg>
)
export default SearchSvg
