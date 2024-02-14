import { useState } from 'react'

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
    console.log(key, items)
    setCurrentActiveKey(key)
    if (onKeyChange && key) {
      onKeyChange(key)
    }
  }

  return (
    <div className={`tabs relative flex h-auto w-auto min-w-full flex-col items-center gap-4 shadow-lg md:items-start md:px-3 ${className ?? ''}`}>
      <div className={`tabs-bar ${centered ? 'centered' : ''} -top-12 flex w-full md:absolute `} style={tabBarStyle}>
        {items.map((item) => (
          <button
            className={`disabled:text-text-disable h-8 w-full hover:bg-accent1-300 hover:text-text-white hover:underline hover:underline-offset-2 focus:bg-accent1-500 active:bg-accent1-500 disabled:bg-disabled md:h-12 md:w-auto md:min-w-[12.5rem] ${
              currentActiveKey == item.key ? 'bg-accent1-500 text-text-white' : 'bg-bg-dark text-text-primary'
            }`}
            onClick={handleChange}
            data-key={item.key}
          >
            <div key={item.key} className={`tab ${currentActiveKey === item.key ? 'active' : ''} ${size ?? ''} flex items-center justify-center`}>
              <h4>{item.title}</h4>
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
