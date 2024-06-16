import React from 'react';
import { User } from '../api/users';
import { Button } from 'antd';

interface UserDetailsProps {
    user: User;
    handleEditForm: (userId: number) => void;
}

//Added user details here to have more cleaner and readable code after adding the form
const UserDetails: React.FC<UserDetailsProps> = ({ user, handleEditForm }) => {
    //I don't want to render the id
    const { id, ...userDetails } = user;
    return (
        <>
            <div>
                {Object.keys(userDetails).map(key => (
                    <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {user[key]}</p>
                ))}
                <Button onClick={() => handleEditForm(id)}>Edit</Button>
                <Button onClick={() => handleEditForm(id)}>See posts</Button> {/*TODO: use react router dom to navigate to posts*/}
            </div>
        </>
    );
};

export default UserDetails