export enum TaskEnum {
  INPUT_TEXT = 1,
  INPUT_IMAGE = 2,
  ANNOTATE_IMAGE = 3,
  FETCH_HASHTAG = 4,
  FETCH_IMAGE = 5,
  COPY_HASHTAG = 6,
  COPY_LABELS = 7,
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
