import {
    setUpdatePost,
} from '../../store/postSlice';
import postReducer from '../../store/postSlice';

describe('setUpdatePost', () => {
    const initialState = {
        posts: [{ id: 1, title: 'Initial Title', body: 'Initial Body', userId: '1' }],
        loading: false,
        error: null,
        editedPost: null,
    };

    it('should handle setUpdatePost', () => {
        const prevState = { ...initialState };
        const updatedPost = { id: 1, title: 'Updated Title', body: 'Updated Body', userId: '1' };
        const action = setUpdatePost(updatedPost);
        const newState = postReducer(prevState, action);

        expect(newState.posts).toEqual([updatedPost]);
        expect(newState.editedPost).toBeNull();
    });


});