enum StoryAccessEnum {
  PRIVATE = 0,
  PUBLIC = 1,
}
namespace StoryAccessEnum {
  export function allNames(): { [key: number]: string } {
    return {
      [StoryAccessEnum.PRIVATE]: 'cms:stories.access.private',
      [StoryAccessEnum.PUBLIC]: 'cms:stories.access.public',
    }
  }

  export function getNameByValue(value: StoryAccessEnum): string {
    const names = allNames()
    return names[value]
  }
}

export default StoryAccessEnum
