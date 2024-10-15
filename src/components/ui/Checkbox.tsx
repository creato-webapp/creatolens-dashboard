import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@utils/index'

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, disabled, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      disabled={disabled}
      className={cn(
        'ring-offset-background focus-visible:ring-ring peer h-4 w-4 shrink-0 rounded-sm border border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[state=checked]:text-white',
        disabled
          ? 'disabled:bg-bg-disabled data-[state=checked]:bg-bg-disabled data-[state=checked]:text-disabled'
          : 'data-[state=checked]:border-none data-[state=checked]:bg-primary-500 ',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
