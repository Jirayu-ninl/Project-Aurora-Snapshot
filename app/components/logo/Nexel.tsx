import clsx from 'clsx'

function NexelLogo({ brandColor }: { brandColor?: boolean }) {
  return (
    <>
      <svg viewBox='0 0 2213.05 512' className='h-full w-full fill-inherit'>
        <path d='m430.61.01v511.99h-93.5L114.37,189.76h-3.75v322.24H2.37V.01h95l221,321.99h4.5V.01h107.75Z' />
        <path d='m864.86,89.27V0h-345.02v345.14h327.24v-89.26h-218.97V89.27h236.75Z' />
        <path d='m1562.32,422.77v-166.89h219.01v-89.26h-327.24v345.38h345.98v-89.23h-237.74Z' />
        <polygon
          className={clsx(brandColor && 'fill-[#7086f0]')}
          points='1831.56 0 1831.56 89.26 1327.66 89.26 1222.94 252.1 1163.52 344.47 1055.76 511.99 519.84 511.99 519.84 422.76 994.33 422.76 1104.11 252.1 1163.52 159.72 1266.26 0 1831.56 0'
        />
        <path d='m1885.31,512V.01h108.25v422.74h219.49v89.25h-327.74Z' />
        <polygon points='1060.79 0 1139.15 121.81 1129.03 137.54 1079.73 214.19 941.95 0 1060.79 0' />
        <polygon points='1390.08 511.99 1271.28 511.99 1187.9 382.39 1198.02 366.66 1247.32 290.01 1390.08 511.99' />
      </svg>
    </>
  )
}

export { NexelLogo }
