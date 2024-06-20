import { Collapse, Spin, Alert, Button, CollapseProps, Flex } from 'antd';
import useUsers from '../hooks/useUsers';
import { User } from '../api/users';
import { useDispatch } from 'react-redux';
import { clearEditUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import { Content } from 'antd/es/layout/layout';

interface UserListProps {
  userId?: number
}
const UserList: React.FC<UserListProps> = ({ userId }) => {
  const { users, loading, error, updateUser } = useUsers();
  const path = useNavigate();
  const dispatch = useDispatch();

  const handleFinishEdit = (values: Partial<User>, userId: number) => {
    const updatedUser = {
      id: userId,
      name: values.name || '',
      username: values.username || '',
      email: values.email || '',
      city: values.city || '',
      street: values.street || '',
      suite: values.suite || ''
    };
    updateUser(updatedUser)
    dispatch(clearEditUser());

  };

  const handleCancelEdit = () => {
    dispatch(clearEditUser());
  };


  const filteredUsers = userId ? users.filter(user => user.id === userId) : users;

  const handleRedirect = (userId: number) => {
    path(`/posts/${userId}`)
  }

  const collapseItems: CollapseProps['items'] = filteredUsers.map((user: User) => ({
    key: user.id.toString(),
    label: `${user.name} (${user.username})`,
    children: (
      <>
        <UserForm
          initialUserValues={user}
          onFinish={(values) => handleFinishEdit(values, user.id)}
          onCancel={handleCancelEdit}
        />
        <Flex justify='end' style={{ padding: "0.625rem" }}>
          <Button type="primary" onClick={() => handleRedirect(user.id)}>See posts</Button>
        </Flex>
      </>
    ),
  }));

  return (
    <Content style={{ padding: "2.5rem" }} >

      {filteredUsers.length > 1 && (
        <Collapse defaultActiveKey={['1']} items={collapseItems} />
      )}
      {filteredUsers.length === 1 && (
        <UserForm
          initialUserValues={filteredUsers[0]}
          onFinish={(values) => handleFinishEdit(values, filteredUsers[0].id)}
          onCancel={handleCancelEdit}
        />
      )}
      {loading && <Spin tip="Loading..." />}
      {error && <Alert message="Error" description={error} type="error" />}
    </Content>
  )
};

export default UserList;






