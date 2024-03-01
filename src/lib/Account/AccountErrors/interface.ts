import { IGenericRowData } from '@components/Table/Row'

export interface IAccountError extends IGenericRowData {
  account: string
  exception: string
  occurred_at: string
  trace_id: string
}
