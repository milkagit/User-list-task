const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};