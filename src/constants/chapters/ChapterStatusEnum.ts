const ChapterStatusEnum = {
  IS_FREE: true,
  IS_NOT_FREE: false,
  allNames(): { [key: string]: string } {
    return {
      [`${ChapterStatusEnum.IS_FREE}`]: 'cms:chapters.status.is_free',
      [`${ChapterStatusEnum.IS_NOT_FREE}`]: 'cms:chapters.status.is_not_free',
    }
  },

  getNameByValue(value: boolean): string {
    return this.allNames()[`${value}`]
  },
}

export default ChapterStatusEnum
