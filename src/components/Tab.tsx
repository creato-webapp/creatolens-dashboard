import { useEffect, useState } from 'react'
import { useMeta } from 'src/hooks/useMeta'

export interface TabItem {
  key: string
  title: string
  children: React.ReactNode
}

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  activeKey?: string
  centered?: boolean
  defaultActiveKey?: string
  items: TabItem[]
  size?: 'large' | 'middle' | 'small'
  scrollable?: boolean
  tabBarExtraContent?: React.ReactNode
  tabBarStyle?: React.CSSProperties
  onKeyChange?: (activeKey: string) => void
  onEdit?: (targetKey: string, action: 'add' | 'remove') => void
}


const Tab: React.FC<TabProps> = ({
  centered,
  defaultActiveKey,
  items,
  size,
  scrollable = true,
  tabBarExtraContent,
  tabBarStyle,
  onKeyChange,
  className,
}) => {
  const [currentActiveKey, setCurrentActiveKey] = useState<string | undefined>(defaultActiveKey)

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.dataset.key
    setCurrentActiveKey(key)
    if (onKeyChange && key) {
      onKeyChange(key)
    }
  }


  // useEffect(() => {
  //   fetch()
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data: DashboardDataList) => {
  //       console.error(data)
  //     })
  // }, [])

  return (
    <div className={`tabs  relative flex h-auto w-auto min-w-full flex-col items-center gap-4 shadow-lg md:items-start md:px-3 ${className ?? ''}`}>
      <div className={`tabs-bar ${centered ? 'centered' : ''} -top-12 flex w-full overflow-x-scroll md:absolute `} style={tabBarStyle}>
        {items.map((item) => (
          <button
            className={`disabled:text-text-disable flex h-8 min-w-[50%] flex-nowrap items-center  justify-center hover:bg-accent1-300 hover:text-text-white hover:underline hover:underline-offset-2 focus:bg-accent1-500 active:bg-accent1-500 disabled:bg-disabled md:h-12 md:min-w-[10rem] lg:min-w-[15rem] ${
              currentActiveKey == item.key ? 'bg-accent1-500 text-text-white' : 'bg-bg-dark text-text-primary'
            }`}
            key={item.key}
            onClick={handleChange}
            data-key={item.key}
          >
            <div key={item.key} className={`tab ${currentActiveKey === item.key ? 'active' : ''} ${size ?? ''} flex items-center justify-center `}>
              <h4 className=" text-nowrap ">{item.title}</h4>
            </div>
          </button>
        ))}
        {tabBarExtraContent}
      </div>
      <div className={`tab-content flex w-full justify-center bg-bg-white md:w-full ${scrollable ? 'overflow-auto' : ''}`}>
        {items.map((item) =>
          currentActiveKey === item.key ? (
            <div
              key={item.key}
              className={`tab-pane ${currentActiveKey === item.key ? 'active' : ''}  inline-block min-w-full flex-col justify-center`}
            >
              {item.children}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default Tab
