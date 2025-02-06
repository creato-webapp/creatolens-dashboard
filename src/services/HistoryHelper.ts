import { StatusEnum, TaskEnum, WorkflowEnum } from 'enums/ImageGenEnums'
import { IHashet } from 'pages/recommendation'

interface InputObject {
  created_at: string
  data?: {
    url?: string
  }
  image_url?: string | null
  labels?: string[]
  updated_at: string
}

interface OutputObject {
  created_at: string
  url?: string
  image_url?: string | null
  labels?: {
    categories: string[]
    labels: string[]
  }
  hashtags?: IHashet[]
  input_obj?: string
  updated_at: string
}

interface History {
  created_at: string
  id: string
  input_object?: InputObject | null
  output_object: OutputObject
  status: StatusEnum
  task_config_ref: TaskEnum
  updated_at: string
}

interface WorkflowTask {
  id: string
  input_type: string
  name: string
  output_type?: string
}

interface WorkflowConfig {
  id: string
  name: keyof typeof WorkflowEnum
  tasks: WorkflowTask[]
}

interface UserRef {
  created_at: string
  email: string
  emailVerified: boolean | null
  id: string | null
  image: string
  name: string
  roles: string[]
  updated_at: string
}

interface Data {
  created_at: string
  histories_ref: History[]
  id: string
  is_deleted: boolean
  is_favorite: boolean
  status: StatusEnum
  updated_at: string
  user_ref: UserRef
  workflow_config_ref: WorkflowConfig
}

export interface HistoryRow {
  created_at: string
  id: string
  is_deleted: boolean
  status: number
  updated_at: string
  user_id: string
  labels: string[]
  hashtags: IHashet[]
  is_favorite: boolean
  uploaded_image: string
}

export const mapHistoryData = (data: Data[]): HistoryRow[] => {
  const result = data.map((item) => {
    const input_image = item.histories_ref.find((history) => history.task_config_ref === TaskEnum['INPUT_IMAGE'])?.output_object?.url || ''
    const output_hashtags = item.histories_ref.find((history) => history.task_config_ref === TaskEnum['FETCH_HASHTAG'])?.output_object?.hashtags || [] // add to array
    const output_labels =
      item.histories_ref.find((history) => history.task_config_ref === TaskEnum['ANNOTATE_IMAGE'])?.output_object?.labels?.labels || [] //split by comma

    return {
      created_at: item.created_at,
      id: item.id,
      is_deleted: item.is_deleted,
      status: item.status,
      updated_at: item.updated_at,
      user_id: item.user_ref.id || item.user_ref.email,
      labels: output_labels,
      hashtags: output_hashtags,
      is_favorite: item.is_favorite,
      uploaded_image: input_image,
    }
  })

  return result
}
