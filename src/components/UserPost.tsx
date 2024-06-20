import usePosts from '../hooks/usePosts';
import { useParams } from 'react-router-dom';
import { deletePostThunk, setUpdatePost, updatePostThunk } from '../store/postSlice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import UserList from './UserList';
import { HighlightOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Typography, message, Popconfirm, Spin, Alert } from 'antd';
import type { PopconfirmProps } from 'antd';
import { Post } from '../api/posts';
import { Content } from 'antd/es/layout/layout';

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
        return () => {
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
        <Content>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <UserList userId={Number(userId)} />
            <Divider />
            {posts.map(post => (
                <Content key={post.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0.5rem 2rem 0.5rem 2rem' }}>
                    <Paragraph
                        strong
                        editable={{
                            icon: <HighlightOutlined />,
                            onChange: (updatedText: string) => handleEdit(post, updatedText, 'title'),
                        }}
                    >
                        title: {post.title}
                    </Paragraph>

                    <Paragraph
                        editable={{
                            icon: <HighlightOutlined />,
                            onChange: (updatedText: string) => handleEdit(post, updatedText, 'body'),
                        }}
                    >
                        body: {post.body}
                    </Paragraph>
                    <Space style={{ paddingTop: '1rem' }}>
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
                        <Button type="primary" onClick={() => handleSave(post)}>Save and send back to API</Button>
                    </Space>
                    <Divider />
                </Content>
            ))}
            {loading && <Spin tip="Loading..." />}
            {error && <Alert message="Error" description={error} type="error" />}

        </Content >
    );
};

export default UserPost;
