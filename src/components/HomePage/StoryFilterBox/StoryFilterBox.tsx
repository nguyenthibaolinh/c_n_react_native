// import { useEffect, useRef } from 'react'

// import CategoryFilterBox from './CategoryFilterBox'
// import StatusFilterBox from './StatusFilterBox'
// import { useAppDispatch, useAppSelector } from '@/app/hooks'
// import {
//   selectStoryFilter,
//   updateStoryFilter,
// } from '@/features/stories/storyFilterSlide'
// import AuthorFilterBox from './AuthorFilterBox'
// import UserFilterBox from './UserFilterBox/UserFilterBox'
// import SortFilterBox from './SortFilterBox'
// import { useTranslation } from 'react-i18next'
// import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
// import useFilterStory from '@/hooks/useFilterStory'
// import { StoriesQuery } from '@/types/storyType'
// import { useGetStoryQuery } from '@/hooks/useGetStoryQuery'
// import { Button } from '@/components/ui/button'
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet'

// const STORY_TYPE = {
//   novel: StoryTypeEnum.WORD,
//   comic: StoryTypeEnum.COMIC,
// }

// type StoryTypeKey = keyof typeof STORY_TYPE

// const StoryFilterBox = () => {
//   const storyFilter = useAppSelector(selectStoryFilter)
//   const dispatch = useAppDispatch()
//   const filterStoryNavigate = useFilterStory()

//   const storyOptions: StoriesQuery = useGetStoryQuery({ withType: true })

//   const { t } = useTranslation(['home_page'])

//   // thao tác liên quan đến sheet
//   // openSheetRef để lấy referent đến button open sheet
//   const openSheetRef = useRef<HTMLButtonElement>(null)

//   // hàm xử lý xự kiện ctrl + p
//   const handleUserKeyPress = (e: KeyboardEvent) => {
//     if (e.ctrlKey && e.key === 'f') {
//       e.preventDefault()
//       openSheetRef.current?.click()
//     }
//   }

//   const handleChangeStoryType = (storyTypeKey: StoryTypeKey) => {
//     const storyFilterNew: StoriesQuery = {
//       type: STORY_TYPE[storyTypeKey],
//       page: 1,
//       categoryIn: '',
//       categoryNotIn: '',
//       isFull: null,
//       key: '',
//     }
//     dispatch(updateStoryFilter(storyFilterNew))

//     filterStoryNavigate(storyFilterNew)
//   }

//   // hàm này để set sự kiện windown on keydown
//   useEffect(() => {
//     window.addEventListener('keydown', handleUserKeyPress)

//     return () => {
//       window.removeEventListener('keydown', handleUserKeyPress)
//     }
//   }, [handleUserKeyPress])

//   useEffect(() => {
//     dispatch(updateStoryFilter(storyOptions))
//   }, [])

//   return (
//     <div className="flex justify-center gap-4">
//       {Object.keys(STORY_TYPE).map((storyTypeKey) => (
//         <Button
//           key={storyTypeKey}
//           variant={
//             STORY_TYPE[storyTypeKey as StoryTypeKey] === storyFilter.type
//               ? 'default'
//               : 'outline'
//           }
//           onClick={() => {
//             handleChangeStoryType(storyTypeKey as StoryTypeKey)
//           }}
//         >
//           {t<any, {}, null>(`filter_story.type.${storyTypeKey}`)}
//         </Button>
//       ))}

//       <Sheet>
//         <SheetTrigger asChild>
//           <Button
//             variant="outline"
//             ref={openSheetRef}
//             className="absolute right-0"
//           >
//             {t('filter_story.btnTitle')}
//           </Button>
//         </SheetTrigger>
//         <SheetContent side={'right'} className="sm:max-w-[700px]">
//           <SheetHeader>
//             <SheetTitle>
//               <span>{t('filter_story.title')}</span>
//             </SheetTitle>
//           </SheetHeader>

//           {/* lọc thể loại */}
//           <CategoryFilterBox
//             categoryIn={storyFilter.categoryIn}
//             categoryNotIn={storyFilter.categoryNotIn}
//           />

//           <div className="flex justify-between mt-6 flex-wrap">
//             {/* lọc trạng thái */}
//             <StatusFilterBox isFull={storyFilter.isFull} />

//             {/* lọc tác giả */}
//             <AuthorFilterBox authorId={storyFilter.authorId} />
//           </div>
//           <div className="flex justify-between mt-6 flex-wrap">
//             {/* lọc user đăng bài */}
//             <UserFilterBox userId={storyFilter.userId} />

//             {/* sắp xếp theo */}
//             <SortFilterBox order={storyFilter.order} />
//           </div>
//           <SheetFooter className="mt-8">
//             <SheetClose asChild>
//               <Button
//                 variant={'default'}
//                 onClick={() => {
//                   filterStoryNavigate({ ...storyFilter, page: 1 })
//                 }}
//               >
//                 {t('filter_story.btnTitle')}
//               </Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </div>
//   )
// }

// export default StoryFilterBox
