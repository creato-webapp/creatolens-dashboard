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
  data?: {
    url?: string
  }
  image_url?: string | null
  labels?: string[]
  hashtags?: {
    hashtags: IHashet[]
    input_obj: string
  }
  input_obj?: string
  updated_at: string
}

interface History {
  created_at: string
  id: string
  input_object?: InputObject | null
  output_object: OutputObject
  status: StatusEnum
  task_config_id: TaskEnum
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
  is_favourited: boolean
  uploaded_image: string
}

export const mapHistoryData = (data: Data[], favouritedIds: string[] = []): HistoryRow[] => {
  const resultV2: HistoryRow[] = data.flatMap((item) => {
    const getTaskOutput = <T>(taskId: TaskEnum, mapper: (history: History) => T | undefined): T[] => {
      return item.histories_ref
        .filter((history) => history.task_config_id === taskId)
        .map(mapper)
        .filter((item): item is T => item !== undefined)
    }

    const input_image = getTaskOutput(TaskEnum['INPUT_IMAGE'], (history) => history.output_object?.data?.url)[0] || ''

    const output_hashtags = getTaskOutput(TaskEnum['FETCH_HASHTAG'], (history) => history.output_object.hashtags?.hashtags).flat()

    const output_labels = getTaskOutput(TaskEnum['ANNOTATE_IMAGE'], (history) => history.output_object.labels).flat()

    // ... rest of the mapping logic ...
    return item.histories_ref.map((history) => ({
      created_at: history.created_at,
      id: history.id,
      is_deleted: item.is_deleted,
      status: history.status,
      updated_at: history.updated_at,
      user_id: item.user_ref.id || item.user_ref.email,
      labels: output_labels,
      hashtags: output_hashtags,
      is_favourited: favouritedIds?.includes(history.id) || false,
      uploaded_image: input_image,
    }))
  })

  return resultV2
}
