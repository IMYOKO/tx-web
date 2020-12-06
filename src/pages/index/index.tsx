import TaskList, { TaskListItemType } from '@/components/task-list';
import React from 'react';
import './index.css';

const Home: React.FC = () => {
  const data: TaskListItemType[] = [
    {
      id: 0,
      title: 'string',
      money: 4,
      name: 'string',
      avatar: 'string',
    },
    {
      id: 1,
      title: 'string',
      money: 4,
      name: 'string',
      avatar: 'string',
    },
  ];
  return (
    <div className="home">
      <TaskList data={data} />
    </div>
  );
};

export default Home;
