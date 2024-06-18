import React, { useRef } from 'react';
import { User } from '../api/users';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';



///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////DELETE COMPONENT/////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////



interface UserDetailsProps {
    user: User;
    handleEditForm: (userId: number) => void;
}

//Added user details here to have more cleaner and readable code after adding the form
const UserDetails: React.FC<UserDetailsProps> = ({ }) => {


    // const handleRedirect = (userId: number) => {
    //     // path(`/posts/`)
    //     path(`/posts/${userId}`)
    // }

    return (
        <>
            <div>
                {/* {Object.keys(userDetails).map(key => (
                    <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {user[key]}</p>
                ))}
                <Button onClick={() => handleEditForm(id)}>Edit</Button> */}
                {/* <Button onClick={() => handleRedirect(id)}>See posts</Button> */}
            </div>
        </>
    );
};

export default UserDetails