import type { FC } from 'react'

interface AccountFieldProps {
  title: string
  value: string | boolean
}

const AccountField: FC<AccountFieldProps> = (props: AccountFieldProps) => {
  return (
    <div className="flex list-none flex-col p-0">
      <li className="flex items-center">
        <label className="mb-2 block flex-1 px-1 text-left text-xs font-bold uppercase tracking-wide text-gray-700">{props.title}</label>
        <div className="flex items-center px-1 text-right">
          {props.value === true || props.value === false ? (
            <>
              {/* <!-- Icon --> */}
              <svg
                aria-hidden="true"
                className={`h-5 w-5 ${props.value ? ' text-green-500 ' : ' text-red-600 '}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </>
          ) : (
            <span className=" text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{props.value}</span>
          )}
        </div>
      </li>
    </div>
  )
}
export default AccountField
