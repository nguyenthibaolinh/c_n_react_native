const UserGenderEnum = {
  SECRET: 0,
  FEMALE: 1,
  MALE: 2,
  LGBT: 3,

  allName() {
    return {
      [this.SECRET]: 'bí mật',
      [this.FEMALE]: 'nữ',
      [this.MALE]: 'nam',
      [this.LGBT]: 'lgbt',
    }
  },

  getNameByValue(value: number) {
    return this.allName()[value]
  },

  getValueByName(name: string) {
    // Convert the keys to numbers since they represent numerical values
    const matchingKey = Object.keys(this.allName()).find(
      (key) => this.allName()[Number(key)] === name
    )
    // Convert the found key back to a number or return undefined if not found
    return matchingKey !== undefined ? Number(matchingKey) : undefined
  },
}

export default UserGenderEnum
