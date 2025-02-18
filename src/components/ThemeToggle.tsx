import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="group relative flex h-6 w-6 cursor-pointer items-center justify-center"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Theme"
    >
      {/* Sun Icon for Light Mode */}
      <SunIcon
        className={`absolute h-5 w-5 transition-all duration-300 ease-in-out  ${
          theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      {/* Moon Icon for Dark Mode */}
      <MoonIcon
        className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}

export default ThemeToggle
