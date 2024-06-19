const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export interface Post {
  id: number,
  title: string,
  body: string,
  userId: string
}

export const fetchPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}?userId=${userId}`);
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
  try {
    const response = await fetch(`${API_URL}/${post.id}`, {
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
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (post: Post): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/${post.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return post
  }
  catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};