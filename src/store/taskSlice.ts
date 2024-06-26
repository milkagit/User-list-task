import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, fetchTasks } from '../api/tasks';

interface TasksState {
	tasks: Task[];
	loading: boolean;
	error: string | null;
}

const initialState: TasksState = {
	tasks: [],
	loading: false,
	error: null,
};

export const fetchTasksThunk = createAsyncThunk(
	'tasks/fetchTasks',
	async () => {
		try {
			const response = await fetchTasks();
			return response;
		} catch (error) {
			console.error('Error fetching tasks:', error);
			throw error;
		}
	}
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTaskCompleted(state, action: PayloadAction<{ taskId: number; completed: boolean }>) {
			const { taskId, completed } = action.payload;
			const taskToUpdate = state.tasks.find(task => task.id === taskId);
			if (taskToUpdate) {
				taskToUpdate.completed = completed;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasksThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasksThunk.fulfilled, (state, action: PayloadAction<Task[]>) => {
				state.tasks = action.payload;
				state.loading = false;
			})
			.addCase(fetchTasksThunk.rejected, (state) => {
				state.loading = false;
				state.error = 'Failed to fetch tasks';
			});
	},
});

export const { setTaskCompleted } = tasksSlice.actions;

export default tasksSlice.reducer;