import React, { useEffect, useState } from 'react';
import Column from './Column/Column';
import Header from './Header/Header';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');
  const [users, setUsers] = useState({});

  const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Extract tickets and users
        const { tickets, users } = data;

        // Create a mapping of userId to user name
        const userMap = users.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});

        // Set the tasks and users in state
        setTasks(tickets);
        setUsers(userMap);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchData();
  }, []);

  const groupTasks = () => {
    if (!Array.isArray(tasks)) {
      return {};
    }

    if (grouping === 'status') {
      const statusGroups = ['Todo', 'In progress', 'Done', 'Backlog', 'Canceled'];
      return statusGroups.reduce((acc, status) => {
        acc[status] = tasks.filter(task => task.status === status);
        return acc;
      }, {});
    }

    if (grouping === 'user') {
      const userGroups = Object.values(users);
      return userGroups.reduce((acc, userName) => {
        acc[userName] = tasks.filter(task => users[task.userId] === userName);
        return acc;
      }, {});
    }

    if (grouping === 'priority') {
      const priorityLevels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      return priorityLevels.reduce((acc, priorityLabel, index) => {
        acc[priorityLabel] = tasks.filter(task => task.priority === index);
        return acc;
      }, {});
    }

    return {};
  };

  const sortTasks = (group) => {
    if (sorting === 'priority') {
      return group.sort((a, b) => b.priority - a.priority);
    }
    if (sorting === 'title') {
      return group.sort((a, b) => a.title.localeCompare(b.title));
    }
    return group;
  };

  const groupedTasks = groupTasks();

  return (
    <>
    <Header
        grouping={grouping}
        setGrouping={setGrouping}
        sorting={sorting}
        setSorting={setSorting}
        />
    <div className="kanban-board">
        <div className='board'>
            <div className="columns">
                {Object.keys(groupedTasks).map((group, index) => (
                    <Column key={index} title={group} tasks={sortTasks(groupedTasks[group])} users={users} />
                ))}
            </div>
        </div>
    </div>
    </>
  );
};

export default KanbanBoard;
