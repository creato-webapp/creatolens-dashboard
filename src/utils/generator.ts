export const getClasses = (index: number, classes: string) => {
  if (index === 0) {
    return classes
  } else if (index === 1) {
    const mdClasses = classes
      .split(' ')
      .map((c) => ` md:${c}`)
      .join(' ')
    return `${mdClasses}`
  } else if (index === 2) {
    const lgClasses = classes
      .split(' ')
      .map((c) => ` lg:${c}`)
      .join(' ')
    return lgClasses
  }
  return index === 0 ? classes : ` md:${classes} lg:${classes}`
}
