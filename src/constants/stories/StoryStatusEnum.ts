const StoryStatusEnum = {
  ONGOING: false,
  COMPLETED: true,
  allNames(): { [key: string]: string } {
    return {
      [`${StoryStatusEnum.ONGOING}`]: 'Đang cập nhật',
      [`${StoryStatusEnum.COMPLETED}`]: 'Hoàn thành',
    }
  },

  getNameByValue(value: boolean): string {
    return this.allNames()[`${value}`]
  },
}

export default StoryStatusEnum
