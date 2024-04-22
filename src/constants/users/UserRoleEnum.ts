const UserRoleEnum = {
  USER: 'user.231',
  ADMIN: 'admin.141',

  allName() {
    return {
      [this.USER]: 'người dùng thường',
      [this.ADMIN]: 'quản trị viên',
    }
  },

  getNameByValue(value: number) {
    return this.allName()[value]
  },
}

export default UserRoleEnum
