import React from 'react';
import useTasks from '../hooks/useTasks';
import { Task as TaskType } from '../api/tasks';
import { Table, Checkbox } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import useUsers from '../hooks/useUsers';
import { User } from '../api/users';
import { setTaskCompleted } from '../store/taskSlice';
import { useDispatch } from 'react-redux';

interface DataType {
  id: React.Key;
  userId: string;
  title: string;
  completed: boolean;
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const UserTask = () => {
  const { tasks, loading, error } = useTasks();
  const { users } = useUsers();
  const dispatch = useDispatch();

  const handleCheckboxChange = (taskId: number, checked: boolean) => {
    dispatch(setTaskCompleted({ taskId, completed: checked }));
  };

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
      onFilter: (value, record) => {
        const filterValue = value === 'Completed'
        return record.completed === filterValue
      },
      render: (completed, record) => (
        <Checkbox
          checked={completed}
          onChange={(e) => handleCheckboxChange(record.id as number, e.target.checked)}
        >
          {completed ? 'Completed' : 'Uncompleted'}
        </Checkbox >
      )
    },
  ];


  const userData = users.map((user: User) => {
    return user.name
  })

  const data: DataType[] = tasks.map((task: TaskType) => ({
    key: task.id,
    id: task.id,
    userId: userData[task.userId - 1], //map userId with user.name
    title: task.title,
    completed: task.completed,
  }));

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
      style={{ padding: "2.5rem" }}
    />
  );
};

export default UserTask;




