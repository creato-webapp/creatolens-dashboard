import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { cn } from '@utils/index'
import { Button } from '@components/ui/Button'
import { Calendar } from '@components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/Popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import dayjs from '@utils/dayjs'

interface DatePickerWithRangeProps {
  className?: string
  date?: DateRange
  setDate: (date: DateRange) => void
}

export function DatePickerWithRange({ className, date, setDate }: DatePickerWithRangeProps) {
  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return
    setDate(range)
    // handle the range here
  }
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={'outline'} className={cn('w-fit justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format('MMM DD, YYYY').toUpperCase().replace(',', '')} -{' '}
                  {dayjs(date.to).format('MMM DD, YYYY').toUpperCase().replace(',', '')}
                </>
              ) : (
                dayjs(date.from).format('MMM DD, YYYY')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-white" align="start">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={handleSelect} numberOfMonths={1} min={3} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
