enum ChapterSortEnum {
  FIRST = 'asc',
  LAST = 'desc',
}

namespace ChapterSortEnum {
  export function allNames(): { [key: string]: string } {
    return {
      [ChapterSortEnum.FIRST]: 'cms:chapters.sort.first',
      [ChapterSortEnum.LAST]: 'cms:chapters.sort.last',
    }
  }

  export function getNameByValue(value: ChapterSortEnum): string {
    const names = allNames()
    return names[value]
  }
}

export default ChapterSortEnum
