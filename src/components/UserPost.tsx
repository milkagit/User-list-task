import { useEffect, useRef } from 'react';
import usePosts from '../hooks/usePosts';
import { useParams } from 'react-router-dom';
import { deletePostThunk, setEditPost, setUpdatePost, updatePostThunk } from '../store/postSlice';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import UserList from './UserList';
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space, Typography, message, Popconfirm, Spin, Alert } from 'antd';
import type { PopconfirmProps } from 'antd';
import { Post } from '../api/posts';

const { Paragraph } = Typography;

const UserPost = () => {
    const { userId } = useParams<{ userId: string }>();
    const { posts, loading, error } = usePosts(Number(userId));
    const dispatch = useDispatch<AppDispatch>();

    const handleEdit = (post: Post, updatedText: string, field: 'title' | 'body') => {
        const updatedPost = {
            ...post,
            [field]: updatedText,
        };
        dispatch(setUpdatePost(updatedPost)); // update the local state immediately
    };

    const handleSave = (post: Post) => {
        dispatch(updatePostThunk(post)); // dispatch thunk to update server response
    };

    const confirmDelete = (post: Post) => {
        return (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
            dispatch(deletePostThunk(post))
                .then(() => {
                    message.success('Post deleted!');
                })
                .catch(() => {
                    message.error('Failed to delete post');
                });
        };
    }

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Action cancelled!');
    };


    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <UserList userId={Number(userId)} />
            <Divider />
            {posts.map(post => (
                <div key={post.id}>
                    <Paragraph
                        strong
                        editable={{
                            icon: <HighlightOutlined />,
                            onChange: (updatedText: string) => handleEdit(post, updatedText, 'title'),
                        }}
                    >
                        title: {post.title}
                    </Paragraph>
                    {/* <Divider /> */}
                    <Paragraph
                        editable={{
                            icon: <HighlightOutlined />,
                            onChange: (updatedText: string) => handleEdit(post, updatedText, 'body'),
                        }}
                    >
                        body: {post.body}
                    </Paragraph>
                    <Button onClick={() => handleSave(post)}>Save and send back to API</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirmDelete(post)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </div>
            ))}
            {loading && <Spin tip="Loading..." />}
            {error && <Alert message="Error" description={error} type="error" />}

        </div >
    );
};

export default UserPost;
