const METHOD = {
  POST: 'POST',
  UPLOAD: 'UPLOAD',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

export type IMethodsType = (typeof METHOD)[keyof typeof METHOD]

export default METHOD
