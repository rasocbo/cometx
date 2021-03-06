import DataLoader from 'dataloader'
import { User } from '@/user/User.Entity'
import { Comment } from '@/comment/Comment.Entity'
import { Post } from '@/post/Post.Entity'

export interface Context {
  req: any
  res: any
  userId36: string
  userId: number
  userLoader: DataLoader<number, User>
  postLoader: DataLoader<number, Post>
  commentLoader: DataLoader<number, Comment>
  joinedLoader: DataLoader<{ userId: number; planetId: number }, boolean>
  postRocketedLoader: DataLoader<{ userId: number; postId: number }, boolean>
  commentRocketedLoader: DataLoader<
    { userId: number; commentId: number },
    boolean
  >
  followingLoader: DataLoader<{ userId: number; followingId: number }, boolean>
  followedLoader: DataLoader<{ userId: number; followedId: number }, boolean>
}
