import { User } from '../api/users';
import UserForm from './UserForm';

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////DELETE COMPONENT/////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

interface UserComponentProps {
  user: User;
  handleEditForm: (userId: number) => void;
  handleCancelEdit: () => void;
  handleFinishEdit: (values: Partial<User>, userId: number) => void;
  editUser: number | null;
}

const UserComponent: React.FC<UserComponentProps> = ({ user, handleEditForm, handleCancelEdit, handleFinishEdit, editUser }) => {

  return (
    <div>
      <UserForm initialUserValues={user} onFinish={(values) => handleFinishEdit(values, user.id)} onCancel={handleCancelEdit} />
    </div>
  )
};

export default UserComponent;

{/* {editUser === user.id ?
        (
          <UserForm initialUserValues={user} onFinish={(values) => handleFinishEdit(values, user.id)} onCancel={handleCancelEdit} />
        )
        : (
          <UserDetails user={user} handleEditForm={() => handleEditForm(user.id)} />
        )}*/}
{/* <Button onClick={() => handleRedirect(id)}>See posts</Button> */ }