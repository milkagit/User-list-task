import usePosts from '../hooks/usePosts';
import { useParams } from 'react-router-dom';
import { deletePostThunk, updatePostThunk } from '../store/postSlice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import UserList from './UserList';
import { HighlightOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Typography, message, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import { Post } from '../api/posts';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';

const { Paragraph } = Typography;

const UserPost = () => {
    const { userId } = useParams<{ userId: string }>();
    const { posts } = usePosts(Number(userId));
    const dispatch = useDispatch<AppDispatch>();

    const [edit, setEdit] = useState<Post>({
        id: 0,
        userId: '',
        body: '',
        title: ''
    });

    const handleSave = (edit: Post) => {
        dispatch(updatePostThunk(edit))
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
            <UserList userId={Number(userId)} />
            <Divider />
            {posts.map(post => (
                <Content key={post.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0.5rem 2rem 0.5rem 2rem' }}>
                    <Paragraph
                        strong
                        editable={{
                            icon: <HighlightOutlined />,
                            onChange: (val: string) => setEdit(edit => ({ ...post, title: val, body: edit?.id === post.id ? edit.body : post.body })),
                        }}
                    >
                        title: {edit?.id === post.id ? edit.title : post.title}
                    </Paragraph>

                    <Paragraph
                        editable={{
                            icon: <HighlightOutlined />,
                            onChange: (val: string) => setEdit(edit => ({ ...post, body: val, title: edit?.id === post.id ? edit.title : post.title })),
                        }}
                    >
                        body: {edit?.id === post.id ? edit.body : post.body}
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
                        <Button type="primary" onClick={() => handleSave(edit)}>Save and send back to API</Button>
                    </Space>
                    <Divider />
                </Content>
            ))}
        </Content >
    );
};

export default UserPost;
