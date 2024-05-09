import { CategoriesStatus, ValueCategoryStatus } from '@/types/categoryType'
import { FC, ReactNode } from 'react'
import CheckBox from '../CheckBox'

type CheckCategoryProp = {
  children: ReactNode
  onChange: (category: CategoriesStatus) => void
  category: CategoriesStatus
}

const CheckCategory: FC<CheckCategoryProp> = ({
  children,
  onChange,
  category,
}) => {
  const changeValue = () => {
    let newValue: ValueCategoryStatus
    switch (category.status) {
      case 1:
        newValue = -1
        break
      case -1:
        newValue = 0
        break
      default:
        newValue = 1
        break
    }
    onChange({ ...category, status: newValue })
  }

  return (
    <div
      role="button"
      onClick={changeValue}
      className="flex items-center"
      tabIndex={0}
    >
      <CheckBox value={category.status} label={children} />
    </div>
  )
}

export default CheckCategory
