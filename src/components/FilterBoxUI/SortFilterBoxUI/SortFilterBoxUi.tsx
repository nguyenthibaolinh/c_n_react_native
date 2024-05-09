// SortFilterBoxUI.jsx
import { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SortFilterBoxUIProps = {
  order?: string
  onValueChange: (value: string) => void
  translate: (key: string) => string
}

const ORDER_LIST = {
  update: 'filter_story.order.update',
  views: 'filter_story.order.views',
  likes: 'filter_story.order.likes',
  chapters: 'filter_story.order.chapters',
  isFull: 'filter_story.order.isFull',
  all: 'filter_story.order.all',
}

type OrderKeyType = keyof typeof ORDER_LIST

const SortFilterBoxUI: FC<SortFilterBoxUIProps> = ({
  order = ORDER_LIST.update,
  onValueChange,
  translate,
}) => {
  return (
    <Select value={order} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={translate(ORDER_LIST[order as OrderKeyType])}
        />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(ORDER_LIST).map((key) => (
          <SelectItem value={key} key={key}>
            {translate(ORDER_LIST[key as OrderKeyType])}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortFilterBoxUI
