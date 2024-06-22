import { Collapse, Spin, Alert, Button, CollapseProps, Flex } from 'antd';
import useUsers from '../hooks/useUsers';
import { User } from '../api/users';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import { Content } from 'antd/es/layout/layout';

interface UserListProps {
  userId?: number
}

const UserList: React.FC<UserListProps> = ({ userId }) => {
  const { users, loading, error } = useUsers();
  const path = useNavigate();



  const handleRedirect = (userId: number) => {
    path(`/posts/${userId}`)
  }

  const filteredUsers = userId ? users.filter(user => user.id === userId) : users;

  const collapseItems: CollapseProps['items'] = filteredUsers.map((user: User) => ({
    key: user.id.toString(),
    label: `${user.name} (${user.username})`,
    children: (
      <>
        <UserForm
          initialUserValues={user}
          filterUser={user.id}
        />
        <Flex justify='end' style={{ padding: "0.625rem" }}>
          <Button type="primary" onClick={() => handleRedirect(user.id)}>See posts</Button>
        </Flex>
      </>
    ),
  }));

  return (
    <Content >
      {filteredUsers.length > 1 && (
        <Collapse defaultActiveKey={['1']} items={collapseItems} />
      )}
      {filteredUsers.length === 1 && (
        <UserForm
          initialUserValues={filteredUsers[0]}
          filterUser={filteredUsers[0].id}
        />
      )}
      {loading && <Spin tip="Loading..." />}
      {error && <Alert message="Error" description={error} type="error" />}
    </Content>
  )
};

export default UserList;






