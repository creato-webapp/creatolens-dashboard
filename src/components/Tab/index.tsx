import { useState } from 'react'

// Define the TabItem type
export interface TabItemType {
  key: string
  title: string
  content: React.ReactNode
}

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  activeKey?: string
  centered?: boolean
  defaultActiveKey?: string
  items: TabItemType[]
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

  const handleChange = (key: string) => {
    console.log(key, items)
    setCurrentActiveKey(key)
    if (onKeyChange) {
      onKeyChange(key)
    }
  }

  const handleEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (onEdit) {
      onEdit(targetKey, action)
    }
  }

  return (
    <div className={`tabs inline-block min-h-0 min-w-full p-4 ${className ? className : ''}`}>
      <div className={`tabs-bar${centered ? ' centered' : ''}  inline-flex`} style={tabBarStyle}>
        {items.map((item) => (
          <button
            type="button"
            className={`px-6 py-2 ${currentActiveKey == item.key ? 'bg-accent1-500 text-text-white' : 'bg-bg-white text-text-primary'}`}
          >
            <div
              key={item.key}
              className={`tab${currentActiveKey === item.key ? ' active' : ''} ${size || ''} p-2 `}
              onClick={() => handleChange(item.key)}
            >
              {item.title}
            </div>
          </button>
        ))}
        {tabBarExtraContent}
      </div>
      <div className={`tab-content bg-bg-white p-4 ${scrollable ? 'overflow-auto' : ''}`}>
        {items.map((item) =>
          currentActiveKey === item.key ? (
            <div
              key={item.key}
              className={`tab-pane${currentActiveKey === item.key ? ' active' : ''}  inline-block min-w-full flex-col justify-center`}
            >
              {item.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default Tab
