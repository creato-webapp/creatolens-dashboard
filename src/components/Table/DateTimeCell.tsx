import { FC } from 'react'

import dayjs, { DATE_FORMAT } from '@utils/dayjs'

import BodyCell, { BodyCellProps } from './BodyCell'

const DateTimeCell: FC<BodyCellProps & { date: dayjs.ConfigType; format?: string }> = ({ date, format, ...props }) => {
  if (!format) {
    return <BodyCell {...props}>{dayjs(date, 'YYYY-MM-DDTHH:mm:ss').local().format(DATE_FORMAT.DD_MMM_YYYY)}</BodyCell>
  }
  return <BodyCell {...props}>{dayjs(date).local().format(format)}</BodyCell>
}

export default DateTimeCell
