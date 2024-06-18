const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export interface Post {
  id: number,
  title: string,
  body: string,
  userId: string
}

export const fetchPosts = async (userId: number): Promise<Post[]> => {
  // const response = await fetch(`API_URL?userId=${id}`);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch posts');
  // }
  // const data = await response.json();
  // console.log('data', data);
  // return data;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


export const updatePostData = async (post: Post): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  return response.json();
};
