import React from "react";
import TodoItem from "./TodoItem";
import "../App.css";

const TodoBoard = ({todoList, deleteTask, completeTask}) => {
  
  const getTodaysDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options).toUpperCase();
  };


  return (
    <div className="todo-board-container">
      <h1 className="todo-date-header">{getTodaysDate()}</h1>
      
      {todoList.length > 0 ? (
        <div className="todo-list">
          {todoList.map((item, index) => (
            <TodoItem
              key={item._id || index}
              item={item}
              index={index + 1}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </div>
      ) : (
        <div className="todo-empty-state">
          No tasks yet. Add your first task above!
        </div>
      )}
    </div>
  );
};

export default TodoBoard;
