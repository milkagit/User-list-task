import { fetchTasks, Task } from "../../api/tasks";

global.fetch = jest.fn()

describe('task API call', () => {

  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
    jest.spyOn(console, 'error').mockImplementation(() => { });
  })

  afterAll(() => {
    jest.restoreAllMocks()
  });

  //fetch
  it('fetches tasks data successfully', async () => {
    const mockTask: Task[] = [
      {
        userId: 1,
        id: 1,
        title: 'title',
        completed: true
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTask
    });

    const tasks = await fetchTasks();
    expect(tasks).toEqual(mockTask);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
  })

  //errors
  it('handle fetch post err', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch tasks'));

    expect.assertions(1);

    try {
      await fetchTasks();
    } catch (error) {
      expect((error as Error).message).toMatch(/Failed to fetch tasks/);
    }
  })


})