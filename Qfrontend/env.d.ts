interface User {
  UID: number,
  Username: string,
  Password: string,
  Follow_count: number,
  Bio: string
}

interface Follower {
  FR: number
  Follows: number,
  Influencer: number
}

interface Arguments {
  AID: number,
  Comment: string,
  Likes: number,
  Views: number,
  Hyperlink: string | null,
  Poster: number,
  T1_votes: number,
  T2_votes: number
}

interface Post {
  PID: number,
  Comment: string,
  Likes: number,
  Views: number,
  Poster: number,
  Hyperlink: string | null
}

interface Replies {
  RID: number,
  Comment: string,
  Likes: number,
  Views: number,
  Poster: number
}

interface Replies_to_args {
  ARID: number,
  reply: number,
  arg: number
}

interface Replies_to_post {
  PRID: number,
  reply: number,
  post: number
}

interface Categories {
  CTID: number,
  Category: string,
  tag: string
}

interface Arg_tags {
  ATID: number,
  arg: number,
  tag: string
}

interface Post_tags {
  APTID: number,
  post: number,
  tag: string
}

interface Api_Error {
  error: string
}

interface UID {
  UID: number
}

interface PID {
  PID: number
}
