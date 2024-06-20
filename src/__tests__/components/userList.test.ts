import { render } from '@testing-library/react';
import UserList from '../../components/UserList';
import useUsers from '../../hooks/useUsers';


jest.mock('../hooks/useUsers');

describe('UserList Component', () => {
    const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('loads without error', () => {
        mockUseUsers.mockReturnValue({
            users: [
                {
                    id: 1,
                    name: 'name',
                    username: 'username',
                    email: 'email@test.com',
                    city: 'city',
                    street: 'street',
                    suite: 'suite',
                },
            ],
            loading: false,
            error: '',
            updateUser: jest.fn(),
        });

        // Render the UserList component
        render(<UserList />);

        const userName = screen.getByText('John Doe');
        expect(userName).toBeInTheDocument();
    });
});