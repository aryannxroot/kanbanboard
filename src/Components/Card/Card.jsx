import React from 'react';
import './Card.css';


const Card = ({ task, users }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span>{task.id}</span>
        <span className="user-name">{users[task.userId] || 'Unknown User'}</span>
      </div>
      <p>{task.title}</p>
      <div className="card-footer">
        <span>{task.tag.join(', ')}</span>
      </div>
    </div>
  );
};

export default Card;
