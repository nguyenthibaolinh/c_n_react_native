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
import AuthorServices, { AuthorKey } from '@/services/authorServices'
import { AuthorResponse } from '@/types/authorType'
import { cn } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, ChevronsUpDown } from 'lucide-react-native'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

type AuthorFilterBoxProp = {
  authorId?: number
}

const AuthorFilterBox: FC<AuthorFilterBoxProp> = memo(({ authorId }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const {
    data: authorsResponse,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [AuthorKey],
    queryFn: AuthorServices.all,
    gcTime: 86400000,
  })

  if (isError) {
    console.log(error)
  }

  const authors: AuthorResponse[] = authorsResponse?.data
  return (
    <>
      {isSuccess && (
        <div className="flex items-center gap-6">
          <h3 className="font-bold">
            {t('home_page:filter_story.author.title')}:{' '}
          </h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={'sm'}
                role="combobox"
                className={'w-[180px] justify-between font-normal'}
              >
                {authorId
                  ? authors.find((author) => author.id === authorId)?.name
                  : t('filter_story.filter_all')}
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
                            authorId: undefined,
                          })
                        )
                      }}
                    >
                      {t('filter_story.filter_all')}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          !authorId ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                    {authors.map((author) => (
                      <CommandItem
                        key={author.id}
                        onSelect={() => {
                          dispatch(
                            updateStoryFilter({
                              authorId: author.id,
                            })
                          )
                        }}
                      >
                        {author.name}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            author.id === authorId ? 'opacity-100' : 'opacity-0'
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

export default AuthorFilterBox
