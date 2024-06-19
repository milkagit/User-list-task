// import React, { useRef, useState } from 'react';
import { Collapse, Spin, Alert, Button } from 'antd';
import useUsers from '../hooks/useUsers';
import { User } from '../api/users';
import { useDispatch } from 'react-redux';
import { clearEditUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';

const { Panel } = Collapse;

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

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }


  const filteredUsers = userId ? users.filter(user => user.id === userId) : users;



  const handleRedirect = (userId: number) => {
    path(`/posts/${userId}`)
  }

  return (
    <div style={{
      padding: "40px",
      boxSizing: "border-box" // <--- this line
    }} >
      {filteredUsers.length > 1 && filteredUsers.map((user: User) => (
        <Collapse
          defaultActiveKey={['1']}
          key={user.id}
        // onChange={onChange}
        >
          <Panel header={`${user.name} (${user.username})`} key={user.id}>
            <UserForm
              initialUserValues={user}
              onFinish={(values) => handleFinishEdit(values, user.id)}
              onCancel={handleCancelEdit}
            />
            <Button onClick={() => handleRedirect(user.id)}>See posts</Button>
          </Panel>
        </Collapse>
      ))}
      {filteredUsers.length === 1 && (
        <UserForm
          initialUserValues={filteredUsers[0]}
          onFinish={(values) => handleFinishEdit(values, filteredUsers[0].id)}
          onCancel={handleCancelEdit}
        />
      )}

    </div>
  )
};

export default UserList;






