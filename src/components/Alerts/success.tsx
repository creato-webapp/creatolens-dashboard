import { FC, useState, useEffect, HTMLAttributes } from 'react'
interface AlertsProps extends HTMLAttributes<HTMLDivElement> {
  isShow: boolean
  setIsShow: Function
}

const Alerts: FC<AlertsProps> = ({ isShow = true, setIsShow }) => {
  const [isHide, setIsHide] = useState(false)

  // useEffect(() => {
  //   setTimeout(setIsShow(false), 3000)
  //   console.log('isHide', isShow)
  // }, [isHide])

  useEffect(() => {
    if (isShow) {
      setTimeout(() => setIsHide(true), 2500)
    }
  }, [isShow])

  return isShow ? (
    <div
      className={`z-50 origin-top transition-transform  delay-100 duration-1000 ease-in-out ${isHide ? `fixed inset-0 z-10 -translate-y-full` : ''}`}
    >
      <div
        className={`${
          isHide ? 'absolute' : 'fixed'
        } inset-x-10 top-10 mx-auto w-fit rounded border border-teal-400 bg-teal-100 px-4 py-3 text-teal-700`}
        role="alert"
      >
        <strong className="font-bold">Success! </strong>
        <span className="block sm:inline">Operation Success</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    </div>
  ) : null
}
export default Alerts
