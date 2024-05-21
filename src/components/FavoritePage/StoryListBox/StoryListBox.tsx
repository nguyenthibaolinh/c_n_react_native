// import { StoriesPaginate, FollowStoriesQuery } from '@/types/storyType'
// import { useQuery } from '@tanstack/react-query'
// import storyServices, { StoryKey } from '@/services/storyServices'
// // import useQueryParams from '@/hooks/useQueryParams'
// import { ActivityIndicator, ScrollView } from 'react-native'
// import StoryItem from '@/components/StoriesList/StoryItem'

// interface StoryListBoxProps {
//   navigation: any
// }

// const StoryListBox: React.FunctionComponent<StoryListBoxProps> = (
//   navigation
// ) => {
//   // const navigate = useNavigate()

//   // const storyOptions: FollowStoriesQuery = useQueryParams()

//   const {
//     data: response,
//     isLoading,
//     isPending,
//     isSuccess,
//   } = useQuery({
//     queryKey: [StoryKey, 'follow', 5],
//     queryFn: () => {
//       return storyServices.follow(5)
//     },
//   })

//   // const onPageChange = (data: number) => {
//   //   navigate(`/favorite?page=${data}`)
//   // }

//   const StoriesPaginate: StoriesPaginate = response?.data
//   console.log(StoriesPaginate)

//   return (
//     <>
//       {(isLoading || isPending) && <ActivityIndicator />}
//       {isSuccess && (
//         <>
//           <ScrollView>
//             {StoriesPaginate.data.map((story) => (
//               <StoryItem key={story.id} story={story} navigation={navigation} />
//             ))}
//           </ScrollView>
//           {/* <div>
//             <Pagination
//               total={StoriesPaginate.total}
//               pageSize={StoriesPaginate.perPage}
//               currentPage={StoriesPaginate.curPage}
//               onPageChange={onPageChange}
//             />
//           </div> */}
//         </>
//       )}
//     </>
//   )
// }

// export default StoryListBox
