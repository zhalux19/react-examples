import { call, put, takeLeading } from "redux-saga/effects"
import { getPosts, type Post } from "./postsApi"
import {
  fetchPosts,
  fetchPostsFulfilled,
  fetchPostsRejected,
} from "./postsSlice"

function* getPostsWorkSaga(action: ReturnType<typeof fetchPosts>) {
  try {
    const { payload } = action
    const data: Record<string, Post> = yield call(getPosts, payload)
    yield put(fetchPostsFulfilled({ data, page: payload.toString() }))
  } catch (e) {
    yield put(fetchPostsRejected())
  }
}

export function* getPostsWatchSaga() {
  yield takeLeading(fetchPosts.type, getPostsWorkSaga)
}
