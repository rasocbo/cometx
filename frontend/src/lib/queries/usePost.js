import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPost = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { post } = await request(
    ctx,
    gql`
      query post($postId: ID!) {
        post(postId: $postId) {
          id
          id36
          title
          pinned
          textContent
          linkUrl
          imageUrls
          relativeUrl
          commentCount
          rocketCount
          isRocketed
          thumbnailUrl
          logoUrl
          domain
          meta {
            title
            description
            twitterCard
          }
          planet {
            id
            name
            description
            color
            avatarUrl
            bannerUrl
            isJoined
          }
          author {
            username
            name
            bio
            avatarUrl
            rocketCount
            followerCount
          }
          timeSince
          timeSinceEdited
        }
      }
    `,
    variables
  )

  return post
}

export const usePost = variables => useQuery(['post', variables], fetchPost)