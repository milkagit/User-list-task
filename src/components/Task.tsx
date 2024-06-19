import React from 'react';
import useTasks from '../hooks/useTasks';
import { useParams } from 'react-router-dom';
import { Task as TaskType } from '../api/tasks';
import { Dropdown, Space, Table, Checkbox } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import useUsers from '../hooks/useUsers';
import { User } from '../api/users';
import { DownOutlined } from '@ant-design/icons';
import setEditStatus from '../store/taskSlice';
import { useDispatch } from 'react-redux';

interface DataType {
  id: React.Key;
  userId: string;
  title: string;
  completed: string;
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Task = () => {
  const { userId } = useParams<{ userId: string }>();
  const { tasks, loading, error } = useTasks(Number(userId));
  const { users } = useUsers();
  const dispatch = useDispatch();

  // const handleCheckboxChange = (taskId: number, checked: boolean) => {
  //   dispatch(setEditStatus({ taskId, completed: checked }));
  // };


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
      render: (completed: string, record: DataType) => (
        <Checkbox
          // onChange={(e) => handleCheckboxChange(record.id as number, e.target.checked)}
          checked={completed === 'Completed'}
        >
          {/* checked={completed === 'Completed'}> */}
          {completed}
        </Checkbox >
      ),
      //     onFilter: (value, record) => record.completed.indexOf(value as string) === 0,
      //     // render: () => (
      //     //   <Space size="middle">
      //     //     <Dropdown menu={{ items }}>
      //     //       <a>
      //     //         More <DownOutlined />
      //     //       </a>
      //     //     </Dropdown>
      //     //   </Space>
      //     // )
    },
  ];


  //connect user id with the user name and display it instead
  const userData = users.map((user: User) => {
    return user.name
  })

  const data: DataType[] = tasks.map((task: TaskType) => ({
    key: task.id,
    id: task.id,
    userId: userData[task.userId - 1],
    title: task.title,
    completed: task.completed ? 'Completed' : 'Uncompleted',
  }));

  console.log('data', data);


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








