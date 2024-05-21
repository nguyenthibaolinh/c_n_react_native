enum ChapterAccessEnum {
  PRIVATE = 0,
  PUBLIC = 1,
}

namespace ChapterAccessEnum {
  export function allNames(): { [key: number]: string } {
    return {
      [ChapterAccessEnum.PRIVATE]: 'cms:chapters.access.private',
      [ChapterAccessEnum.PUBLIC]: 'cms:chapters.access.public',
    }
  }

  export function getNameByValue(value: ChapterAccessEnum): string {
    const names = allNames()
    return names[value]
  }
}

export default ChapterAccessEnum
