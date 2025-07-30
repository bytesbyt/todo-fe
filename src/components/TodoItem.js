import React from "react";
import "../App.css";

const TodoItem = ({item, index, deleteTask, completeTask}) => {
  

  return (
    <div className="todo-item">
      <div className="todo-item-index">
        {String(index).padStart(2, '0')}
      </div>
      
      <div className="todo-checkbox-container">
        <div 
          className={`todo-checkbox ${item.isComplete ? 'completed' : ''}`}
          onClick={() => completeTask(item._id)}
        >
          {item.isComplete && (
            <div className="todo-checkbox-checkmark">
              ✓
            </div>
          )}
        </div>
      </div>

      <div className={`todo-task-content ${item.isComplete ? 'completed' : ''}`}>
        {item.task}
      </div>
      {item.author && (
        <div className={`todo-task-content ${item.isComplete ? 'completed' : ''}`}>
          by {item.author.name}
        </div>
      )}

      <div className="todo-action-buttons">
        <button 
          className="todo-delete-button"
          onClick={() => deleteTask(item._id)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
