import usePosts from '../hooks/usePosts';
import { useParams } from 'react-router-dom';
import { setEditPost, setUpdatePost } from '../store/postSlice';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import UserList from './UserList';
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space, Typography } from 'antd';
import { Post } from '../api/posts';

const { Paragraph } = Typography;

const UserPost = () => {
    const { userId } = useParams<{ userId: string }>();
    const { posts, loading, error, updatePost } = usePosts(Number(userId));
    const dispatch = useDispatch<AppDispatch>();


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;



    const handleEdit = (post: Post, updatedText: string, field: 'title' | 'body') => {
        const updatedPost = {
            ...post,
            [field]: updatedText,
        }
        dispatch(setEditPost(updatedPost));
        updatePost(updatedPost)
    };

    const handleSave = (post: Post) => {
        dispatch(setUpdatePost(post));
    }

    return (
        <div>
            <UserList userId={Number(userId)} />
            <Divider />
            {posts.map(post => (
                <div key={post.id}>
                    <Paragraph
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
                    <button onClick={() => handleSave(post)}>Save</button>
                </div>
            ))}
        </div >
    );
};

export default UserPost;
