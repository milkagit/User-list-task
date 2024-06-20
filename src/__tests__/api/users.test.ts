import { postUpdateUserData, fetchUsers, User } from "../../api/users";

global.fetch = jest.fn()

describe('user API call', () => {

  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
    jest.spyOn(console, 'error').mockImplementation(() => { });
  })

  afterAll(() => {
    jest.restoreAllMocks()
  });

  //fetch/update/delete
  it('fetches posts data successfully', async () => {
    const mockPost: User[] = [
      {
        id: 1,
        name: 'name',
        username: 'userName',
        email: 'email@test.com',
        street: 'street',
        suite: 'suite',
        city: 'city',
      }
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost
    });

    const posts = await fetchUsers();
    expect(posts).toEqual(mockPost);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  })


  it('update user data successfully', async () => {
    const mockPost: User = {
      id: 1,
      name: 'name 2',
      username: 'userName',
      email: 'email2@test.com',
      street: 'street 2',
      suite: 'suite 2',
      city: 'city 2',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost
    })

    const posts = await postUpdateUserData(mockPost)
    expect(posts).toEqual(mockPost)
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: mockPost.id,
        name: mockPost.name,
        username: mockPost.username,
        email: mockPost.email,
        street: mockPost.street,
        suite: mockPost.suite,
        city: mockPost.city
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })


  //errors
  it('handle fetch user err', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    expect.assertions(2);

    try {
      await fetchUsers();
    } catch (error) {
      expect((error as Error).message).toMatch('Failed to fetch users');
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching users:',
        expect.any(Error)
      );
    }
  });


  it('handles update user error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    });

    await expect(postUpdateUserData({
      id: 1,
      name: 'name 2',
      username: 'userName 2',
      email: 'email2@test.com',
      street: 'street 2',
      suite: 'suite 2',
      city: 'city 2'
    })).rejects.toThrow('Failed to update user');
  });


})