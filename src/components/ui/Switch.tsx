import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@utils/index'
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string
  description?: string
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, disabled, label, description, ...props }, ref) => (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-col">
        {label && <label className={`block text-base text-neutral-800 ${disabled && 'text-text-disabled'}`}>{label}</label>}
        {description && <p className={`mt-1 block text-base text-neutral-500  ${disabled && 'text-text-disabled'}`}>{description}</p>}
      </div>
      <SwitchPrimitives.Root
        className={cn(
          'focus-visible:ring-ring focus-visible:ring-offset-background data-[state=unchecked]:bg-input peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full  border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:border-disabled data-[state=checked]:bg-primary-500',
          className
        )}
        disabled={disabled}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            'pointer-events-none block h-[18px] w-[18px] rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-1  data-[state=unchecked]:border-disabled data-[state=unchecked]:bg-neutral-500'
          )}
        />
      </SwitchPrimitives.Root>
    </div>
  )
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
