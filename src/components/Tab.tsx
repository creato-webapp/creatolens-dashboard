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
  activeKey,
  centered,
  defaultActiveKey,
  items,
  size,
  scrollable = true,
  tabBarExtraContent,
  tabBarStyle,
  onKeyChange,
  onEdit,
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

  const handleEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (onEdit) {
      onEdit(targetKey, action)
    }
  }

  return (
    <div className={`tabs flex h-auto w-auto min-w-full flex-col items-center md:items-start ${className ? className : ''}`}>
      <div className={`tabs-bar${centered ? ' centered' : ''} inline-flex `} style={tabBarStyle}>
        {items.map((item) => (
          <button
            className={`disabled:text-text-disable h-8 w-auto min-w-[12.5rem] hover:bg-accent1-300 hover:text-text-white focus:bg-accent1-500 active:bg-accent1-500 disabled:bg-disabled md:h-12 ${
              currentActiveKey == item.key ? 'bg-accent1-500 text-text-white' : 'bg-bg-white text-text-primary'
            }`}
            onClick={handleChange}
            data-key={item.key}
          >
            <div key={item.key} className={`tab${currentActiveKey === item.key ? ' active' : ''} ${size || ''} d flex items-center justify-center `}>
              <h4>{item.title}</h4>
            </div>
          </button>
        ))}
        {tabBarExtraContent}
      </div>
      <div className={`tab-content flex w-fit justify-center bg-bg-white py-2 md:w-full ${scrollable ? 'overflow-auto' : ''}`}>
        {items.map((item) =>
          currentActiveKey === item.key ? (
            <div
              key={item.key}
              className={`tab-pane ${currentActiveKey === item.key ? ' active' : ''}  inline-block min-w-full flex-col justify-center`}
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
