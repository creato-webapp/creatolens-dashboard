export enum TaskEnum {
  INPUT_TEXT = 'task_config/1',
  INPUT_IMAGE = 'task_config/2',
  ANNOTATE_IMAGE = 'task_config/3',
  FETCH_HASHTAG = 'task_config/4',
  FETCH_IMAGE = 'task_config/5',
  COPY_HASHTAG = 'task_config/6',
  COPY_LABELS = 'task_config/7',
}

export enum StatusEnum {
  CREATED = 1,
  PENDING = 2,
  VERIFYING = 3,
  PROCESSING = 4,
  ABORTED = 5,
  COMPLETED = 6,
  FAILED = 7,
}

export enum WorkflowEnum {
  TEXT_TO_HASHTAG = 1,
  IMAGE_TO_HASHTAG = 2,
}
