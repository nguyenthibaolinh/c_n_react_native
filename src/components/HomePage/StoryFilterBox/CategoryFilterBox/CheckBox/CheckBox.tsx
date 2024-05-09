import { Check, X } from 'lucide-react-native'
import { FC, memo, ReactNode } from 'react'

type CheckBoxProp = {
  value: number
  label: string | ReactNode
}
const CheckBox: FC<CheckBoxProp> = memo(({ value, label }) => {
  let icon = <span className="w-6"></span>

  if (value !== 0) {
    icon =
      value === 1 ? (
        <Check strokeWidth={4} color="#00bf63" />
      ) : (
        <X strokeWidth={4} color="#e81717" />
      )
  }

  return (
    <>
      <div
        className={`w-6 h-6 flex justify-center items-center mr-2 border rounded bg-white`}
      >
        {icon}
      </div>
      <span className="select-none overflow-hidden w-full">{label}</span>
    </>
  )
})

export default CheckBox
