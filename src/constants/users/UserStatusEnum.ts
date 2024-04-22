const UserStatusEnum = {
  UNCONFIRMED: 0,
  CONFIRMED: 1,

  allName() {
    return {
      [this.UNCONFIRMED]: 'chưa xác thực',
      [this.CONFIRMED]: 'đã xác thực',
    }
  },

  getNameByValue(value: number) {
    return this.allName()[value]
  },
}

export default UserStatusEnum
