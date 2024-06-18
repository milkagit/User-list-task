const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    // console.log('response tasks', response) //response ok
    // const response = await fetch(`${API_URL}/todos?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};