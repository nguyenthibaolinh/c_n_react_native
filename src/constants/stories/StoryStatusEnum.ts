const StoryStatusEnum = {
  ONGOING: false,
  COMPLETED: true,
  allNames(): { [key: string]: string } {
    return {
      [`${StoryStatusEnum.ONGOING}`]: 'cms:stories.status.ongoing',
      [`${StoryStatusEnum.COMPLETED}`]: 'cms:stories.status.completed',
    }
  },

  getNameByValue(value: boolean): string {
    return this.allNames()[`${value}`]
  },
}

export default StoryStatusEnum
