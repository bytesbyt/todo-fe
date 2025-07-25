import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({todoList, deleteTask, completeTask}) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 &&
        todoList.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        ))}

    </div>
  );
};

export default TodoBoard;
