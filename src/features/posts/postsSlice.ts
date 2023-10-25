// import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import ApiStatus from "../../types/ApiStatus"
// import type { Post } from "./postsApi"

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import ApiStatus from "../../types/ApiStatus"
import type { Post } from "./postsApi"

// type PostsState = {
//   posts: Record<string, Post>
//   pages: Record<string, string[]>
//   fetchPostsApiStatus: ApiStatus
// }

// const initialState: PostsState = {
//   posts: {},
//   pages: {},
//   fetchPostsApiStatus: ApiStatus.Idle,
// }

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     fetchPosts: (state, action: PayloadAction<number>) => {
//       state.fetchPostsApiStatus = ApiStatus.Pending
//     },
//     fetchPostsFulfilled: (
//       state,
//       action: PayloadAction<{ data: Record<string, Post>; page: string }>,
//     ) => {
//       const { data, page } = action.payload
//       state.fetchPostsApiStatus = ApiStatus.Fulfilled
//       state.posts = { ...state.posts, ...data }
//       state.pages[page] = Object.keys(data)
//     },
//     fetchPostsRejected: (state) => {
//       state.fetchPostsApiStatus = ApiStatus.Rejected
//     },
//   },
// })

// export const { fetchPosts, fetchPostsFulfilled, fetchPostsRejected } =
//   postsSlice.actions
// export default postsSlice.reducer

type PostsState = {
  posts: Record<string, Post>
  pages: Record<string, string[]>
  fetchPostsApiStatus: ApiStatus
}

const initialState: PostsState = {
  posts: {},
  pages: {},
  fetchPostsApiStatus: ApiStatus.Idle,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPosts: (state, action: PayloadAction<number>) => {
      state.fetchPostsApiStatus = ApiStatus.Pending
    },
    fetchPostsFulfilled: (
      state,
      action: PayloadAction<{ data: Record<string, Post>; page: string }>,
    ) => {
      const { data, page } = action.payload
      state.fetchPostsApiStatus = ApiStatus.Fulfilled
      state.posts = { ...state.posts, ...data }
      state.pages[page] = Object.keys(data)
    },
    fetchPostsRejected: (state) => {
      state.fetchPostsApiStatus = ApiStatus.Rejected
    },
  },
})
export const { fetchPosts, fetchPostsFulfilled, fetchPostsRejected } =
  postsSlice.actions
export default postsSlice.reducer
