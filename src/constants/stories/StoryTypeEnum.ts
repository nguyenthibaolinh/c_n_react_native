enum StoryTypeEnum {
  WORD = 1,
  COMIC = 2,
  SPEECH = 3,
}

// Mở rộng enum với namespace để thêm phương thức
namespace StoryTypeEnum {
  // Phương thức trả về tất cả tên
  export function allNames(): { [key: number]: string } {
    return {
      [StoryTypeEnum.WORD]: 'Truyện chữ',
      [StoryTypeEnum.COMIC]: 'Truyện tranh',
      [StoryTypeEnum.SPEECH]: 'truyện nói',
    }
  }

  // Phương thức lấy tên dựa trên giá trị enum
  export function getNameByValue(value: StoryTypeEnum): string {
    const names = allNames()
    return names[value]
  }
}

export default StoryTypeEnum
