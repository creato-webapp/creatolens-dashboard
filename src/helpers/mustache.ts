import Mustache from 'mustache'

export type MustacheVariable = {
  [key: string]: string | string[] | number
}

export function renderTemplate(template: string, variable: MustacheVariable): string {
  const rendered = Mustache.render(template, variable)
  return rendered
}
