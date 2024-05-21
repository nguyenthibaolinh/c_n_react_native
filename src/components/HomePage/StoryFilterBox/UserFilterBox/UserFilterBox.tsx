import { useAppDispatch } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import UserServices, { UserKey } from '@/services/userServices'
import { UserPublic } from '@/types/userType'
import { cn } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, ChevronsUpDown } from 'lucide-react-native'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

type UserFilterBoxProp = {
  userId?: number
}

const UserFilterBox: FC<UserFilterBoxProp> = memo(({ userId }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const {
    data: usersResponse,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [UserKey],
    queryFn: UserServices.all,
    gcTime: 86400000,
  })

  if (isError) {
    console.log(error)
  }

  const users: UserPublic[] = usersResponse?.data
  return (
    <>
      {isSuccess && (
        <div className="flex items-center gap-6">
          <h3 className="font-bold">{t('filter_story.user.title')}: </h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={'sm'}
                role="combobox"
                className={'justify-between font-normal w-[180px]'}
              >
                <span className="max-w-[175px] overflow-hidden">
                  {userId
                    ? `${
                        users.find((user) => user.id === userId)?.fullName
                      } (${userId})`
                    : t('filter_story.filter_all')}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>

                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        dispatch(
                          updateStoryFilter({
                            userId: undefined,
                          })
                        )
                      }}
                    >
                      {t('filter_story.filter_all')}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          !userId ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => {
                          dispatch(
                            updateStoryFilter({
                              userId: user.id,
                            })
                          )
                        }}
                      >
                        {user.fullName} ({user.id})
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            user.id === userId ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  )
})

export default UserFilterBox
