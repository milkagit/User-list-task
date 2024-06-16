import React from 'react';
import { Collapse, Spin, Alert } from 'antd';
import useUsers from '../hooks/useUsers';
import { User } from '../api/users';
import UserDetails from './UserDetails';
import UserForm from './UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearEditUser, setEditUser, setUpdateUser } from '../store/userSlice';

const { Panel } = Collapse;

const UserList: React.FC = () => {
  const { users, loading, error, updateUser } = useUsers();
  const dispatch = useDispatch();
  const editUser = useSelector((state: RootState) => state.users.editUser);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const handleEditForm = (userId: number) => {
    dispatch(setEditUser(userId));
  };

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
    // dispatch(setUpdateUser(updatedUser));
    // dispatch(clearEditUser());
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

  console.log('users', users);

  return (
    <div>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
      >
        {users.map((user: User) => (
          <Panel header={`${user.name} (${user.username})`} key={user.id.toString()}>
            {editUser === user.id ?
              (
                <UserForm initialUserValues={user} onFinish={(values) => handleFinishEdit(values, user.id)} onCancel={handleCancelEdit} />
              )
              : (
                <UserDetails user={user} handleEditForm={handleEditForm} />
              )}
          </Panel>
        ))}
      </Collapse>
    </div>
  )
};

export default UserList;