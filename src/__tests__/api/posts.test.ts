import { deletePost, fetchPosts, Post, updatePostData } from "../../api/posts";

global.fetch = jest.fn()

describe('post API call', () => {

  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
    jest.spyOn(console, 'error').mockImplementation(() => { });
  })

  afterAll(() => {
    jest.restoreAllMocks()
  });

  //fetch/update/delete
  it('fetches posts data successfully', async () => {
    const mockPost: Post[] = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: '1' },
      { id: 2, title: 'Post 2', body: 'Body 2', userId: '1' }
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost
    });

    const posts = await fetchPosts(1);
    expect(posts).toEqual(mockPost);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?userId=1');
  })

  it('update post data successfully', async () => {
    const mockPost: Post = { id: 1, title: 'updated 1', body: 'updated 1', userId: '1' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost
    })

    const posts = await updatePostData(mockPost)
    expect(posts).toEqual(mockPost)
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PATCH',
      body: JSON.stringify({
        id: mockPost.id,
        userId: mockPost.userId,
        title: mockPost.title,
        body: mockPost.body,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  })

  it('delete post data', async () => {
    const mockPost: Post = { id: 1, title: 'updated 1', body: 'updated 1', userId: '1' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost
    })

    const posts = await deletePost(mockPost)
    expect(posts).toEqual(mockPost)
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE'
    })
  })

  //errors
  it('handle fetch post err', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    expect.assertions(2);

    try {
      await fetchPosts(1);
    } catch (error) {
      expect((error as Error).message).toMatch(/Network response was not ok/);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching posts:',
        expect.any(Error)
      );
    }
  });


  it('handles update post error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    });

    await expect(updatePostData({
      id: 1,
      title: 'Title',
      body: 'Body',
      userId: '1',
    })).rejects.toThrow('Failed to update post');
  });


  it('handles delete post error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    });

    await expect(deletePost(
      {
        id: 1,
        title: 'updated 1',
        body: 'updated 1',
        userId: '1'
      }
    )).rejects.toThrow('Failed to delete post');
  });



})