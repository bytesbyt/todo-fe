import React from "react";
import TodoItem from "./TodoItem";
import colors from "../styles/colors";

const TodoBoard = ({todoList, deleteTask, completeTask}) => {
  // Get today's date formatted nicely
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

  const containerStyle = {
    width: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textAlign: 'center',
    marginBottom: '40px',
    color: colors.black,
    borderBottom: `3px solid ${colors.black}`,
    paddingBottom: '20px',
    marginTop: '40px'
  };

  const taskListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    width: '100%'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    color: colors.textGray,
    fontSize: '16px',
    marginTop: '60px',
    fontStyle: 'italic'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>{getTodaysDate()}</h1>
      
      {todoList.length > 0 ? (
        <div style={taskListStyle}>
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
        <div style={emptyStateStyle}>
          No tasks yet. Add your first task above!
        </div>
      )}
    </div>
  );
};

export default TodoBoard;
