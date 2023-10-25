import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import ApiStatus from "../../types/ApiStatus"
import { fetchPosts } from "./postsSlice"
const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentParams = Object.fromEntries([...searchParams])
  const pageNumberStr = currentParams["pageNumber"]
  const pageNumber = parseInt(pageNumberStr) || 1
  const dispatch = useAppDispatch()
  const fetchPostsApiStatus = useAppSelector(
    (state) => state.posts.fetchPostsApiStatus,
  )
  const posts = useAppSelector((state) => state.posts.posts)
  const pages = useAppSelector((state) => state.posts.pages)
  const handleClickNext = () => {
    const nextPage = pageNumber + 1
    dispatch(fetchPosts(nextPage))
    searchParams.set("pageNumber", nextPage.toString())
    setSearchParams(searchParams)
  }
  useEffect(() => {
    console.log(pageNumber)
    dispatch(fetchPosts(pageNumber))
  }, [])
  return (
    <>
      <p>Posts</p>
      {fetchPostsApiStatus === ApiStatus.Fulfilled ? (
        Object.values(pages[pageNumberStr]).map((postId) => (
          <li key={postId}>{posts[postId].name}</li>
        ))
      ) : (
        <p>Loading</p>
      )}
      <button
        onClick={() => {
          handleClickNext()
        }}
      >
        next page
      </button>
    </>
  )
}

export default Posts
