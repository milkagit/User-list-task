import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import UserPost from './components/UserPost';
import Task from './components/Task';
import UserList from './components/UserList';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to="/">User list</Link>,
    key: '/'
  },
  {
    label: <Link to="/task">User task</Link>,
    key: '/task'
  }
]

const App: React.FC = () => {
  const [current, setCurrent] = useState('/');

  const handleClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };


  return (
    <Router>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' items={items} />
      <Routes>
        <Route path="/" Component={UserList} />
        <Route path="/posts/:userId" Component={UserPost} />
        <Route path="/task" Component={Task} />
      </Routes>
    </Router>
  );
}

export default App;