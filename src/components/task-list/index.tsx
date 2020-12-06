import React from 'react';
import './index.less';

export interface TaskListItemType {
  id: number;
  title: string;
  money: number;
  name: string;
  avatar: string;
}

export interface TaskListProps {
  data: TaskListItemType[];
}

const TaskListItem: React.FC = () => {
  return <div className="task-list-item">ddddd</div>;
};

const TaskList: React.FC<TaskListProps> = props => {
  const { data } = props;
  return (
    <ul className="task-list">
      {data.map((_: TaskListItemType, index: number) => (
        <li key={index}>
          <TaskListItem key={index} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
