import { useState } from 'react'

// Define the TabItem type
export interface TabItemType {
  key: string
  title: string
  content: React.ReactNode
}

interface TabProps {
  activeKey?: string
  centered?: boolean
  defaultActiveKey?: string
  items: TabItemType[]
  size?: 'large' | 'middle' | 'small'
  scrollable?: boolean
  tabBarExtraContent?: React.ReactNode
  tabBarStyle?: React.CSSProperties
  onChange?: (activeKey: string) => void
  onEdit?: (targetKey: string, action: 'add' | 'remove') => void
}

const TabComponent: React.FC<TabProps> = ({
  activeKey,
  centered,
  defaultActiveKey,
  items,
  size,
  scrollable = true,
  tabBarExtraContent,
  tabBarStyle,
  onChange,
  onEdit,
}) => {
  const [currentActiveKey, setCurrentActiveKey] = useState<string | undefined>(defaultActiveKey)

  const handleChange = (key: string) => {
    console.log(key, items)
    setCurrentActiveKey(key)
    if (onChange) {
      onChange(key)
    }
  }

  const handleEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (onEdit) {
      onEdit(targetKey, action)
    }
  }

  return (
    <div className="tabs inline-block min-h-full min-w-full p-4">
      <div className={`tabs-bar${centered ? ' centered' : ''}  inline-flex`} style={tabBarStyle}>
        {items.map((item) => (
          <button className={`px-6 py-2 ${currentActiveKey == item.key ? 'bg-orange-500 text-text-white' : 'bg-bg-white text-text-primary'}`}>
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
      <div className={`tab-content bg-bg-white p-4 ${scrollable ? 'h-64 overflow-auto' : 'h-48'}`}>
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

export default TabComponent
