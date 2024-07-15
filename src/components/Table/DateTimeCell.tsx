import { FC } from 'react'

import dayjs, { DATE_FORMAT } from '@helpers/dayjs'

import BodyCell, { BodyCellProps } from './BodyCell'

const DateTimeCell: FC<BodyCellProps & { date: dayjs.ConfigType }> = ({ date, ...props }) => {
  return <BodyCell {...props}>{dayjs(date, 'YYYY-MM-DDTHH:mm:ss').local().format(DATE_FORMAT.DD_MMM_YYYY)}</BodyCell>
}

export default DateTimeCell
