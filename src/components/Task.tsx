import React from 'react';
import useTasks from '../hooks/useTasks';
import { useParams } from 'react-router-dom';
import { Task as TaskType } from '../api/tasks';
import { Dropdown, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import useUsers from '../hooks/useUsers';
import { User } from '../api/users';
import { DownOutlined } from '@ant-design/icons';

interface DataType {
  id: React.Key;
  userId: string;
  title: string;
  completed: string;
  ///
  // key: React.Key;
  // date: string;
  // name: string;
  // upgradeNum: string;
}

const items = [
  { key: '1', label: 'Completed' },
  { key: '2', label: 'Uncompleted' },
];

let columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'userId',
    showSorterTooltip: { target: 'full-header' },
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      }
    ],
    // specify the condition of filtering result here is that finding the name started with `value`
    onFilter: (value, record) => record.userId.indexOf(value as string) === 0,
    sorter: (a, b) => a.userId.length - b.userId.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Title',
    dataIndex: 'title',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Status',
    dataIndex: 'completed',
    filters: [
      {
        text: 'Completed',
        value: 'Completed',
      },
      {
        text: 'Uncompleted',
        value: 'Uncompleted',
      },
    ],
    onFilter: (value, record) => record.completed.indexOf(value as string) === 0,
    // render: () => (
    //   <Space size="middle">
    //     <Dropdown menu={{ items }}>
    //       <a>
    //         More <DownOutlined />
    //       </a>
    //     </Dropdown>
    //   </Space>
    // )
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Task = () => {
  const { userId } = useParams<{ userId: string }>();
  const { tasks, loading, error } = useTasks(Number(userId));
  const { users } = useUsers();

  // console.log('tasks list array', tasks);


  //connect user id with the user name
  const userData = users.map((user: User) => {
    return user.name
  })

  const data = tasks.map((task: TaskType) => ({
    id: task.id,
    userId: userData[task.userId - 1],
    title: task.title,
    completed: task.completed ? 'Completed' : 'Uncompleted',
  }));


  //feed filter data dynamically
  const filterMap = new Map();

  tasks.forEach((task) => {
    if (!filterMap.has(task.userId)) {
      filterMap.set(task.userId, {
        text: userData[task.userId - 1],
        value: userData[task.userId - 1],
      });
    }
  });

  columns[0].filters = Array.from(filterMap.values());

  const testDropdown = columns[2].render
  console.log('testDropdown', testDropdown)



  // console.log('userId', userData);
  // console.log('data', data);

  return (
    <Table
      id='table'
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default Task;


// if (data.length === userData.length) {
//   data.forEach((item, index) => {
//     item.userId = userData[index]
//   })
// }


// const dynamicFilters = tasks.map((task: TaskType) => ({
//   text: userData[task.userId - 1],
//   value: task.userId,
// }))

// columns[0].filters = [...dynamicFilters];









