// import axios from "axios"

// export type Post = {
//   id: string
//   name: string
// }

// export const getPosts = async (
//   pageNumber: number,
// ): Promise<Record<string, Post>> => {
//   try {
//     const { data } = await axios.get(`./api/posts?pageNumber=${pageNumber}`)
//     return data
//   } catch (e) {
//     throw e
//   }
// }

import axios from "axios"

export type Post = {
  id: string
  name: string
}

export const getPosts = async (
  pageNumber: number,
): Promise<Record<string, Post>> => {
  try {
    const { data } = await axios.get(`./api/posts?pageNumber=${pageNumber}`)
    return data
  } catch (e) {
    throw e
  }
}
