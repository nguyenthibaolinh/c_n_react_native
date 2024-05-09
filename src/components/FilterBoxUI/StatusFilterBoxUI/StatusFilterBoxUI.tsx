import { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type StatusFilterBoxUIProp = {
  statusStory: string
  onStatusChange: (value: boolean | null) => void
  translate: (key: string) => string // giả định bạn sẽ truyền hàm dịch từ container
}

const STATUS_STORY = {
  null: {
    label: 'filter_story.status.all',
    value: null,
  },
  false: {
    label: 'filter_story.status.false',
    value: false,
  },
  true: {
    label: 'filter_story.status.true',
    value: true,
  },
}

type StatusKeyType = keyof typeof STATUS_STORY

const StatusFilterBoxUI: FC<StatusFilterBoxUIProp> = ({
  statusStory,
  onStatusChange,
  translate,
}) => {
  const handleStatusChange = (value: string) => {
    onStatusChange(STATUS_STORY[value as StatusKeyType].value)
  }
  return (
    <Select value={statusStory} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={translate(
            STATUS_STORY[statusStory as StatusKeyType].label
          )}
        />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(STATUS_STORY).map((statusStoryKey) => {
          return (
            <SelectItem value={statusStoryKey} key={statusStoryKey}>
              {translate(STATUS_STORY[statusStoryKey as StatusKeyType].label)}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default StatusFilterBoxUI
