import { useEffect, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";
import api from "./utils/api";
import colors from "./styles/colors";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: colors.white,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '40px 20px'
  };

  const mainContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%'
  };

  const inputContainerStyle = {
    display: 'flex',
    marginBottom: '0px',
    gap: '0px',
    width: '100%'
  };

  const inputStyle = {
    flex: '1 1 0',
    minWidth: '0',
    height: '60px',
    padding: '0 24px',
    fontSize: '16px',
    fontWeight: '400',
    border: `2px solid ${colors.black}`,
    borderRight: 'none',
    outline: 'none',
    backgroundColor: colors.white,
    color: colors.black,
    letterSpacing: '1px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    '::placeholder': {
      color: colors.placeholderGray,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: '300'
    }
  };

  const addButtonStyle = {
    backgroundColor: colors.black,
    color: colors.white,
    border: `2px solid ${colors.black}`,
    height: '60px',
    padding: '0 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '70px',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box'
  };

  const getTasks=async() => {
    const response = await api.get("/tasks")
    console.log("fff",response);
    setTodoList(response.data.data);
  };

  const addTask=async()=>{
    if (!todoValue.trim()) return;
    
    try{
      const response=await api.post("/tasks",{task:todoValue, isComplete:false});
      if(response.status===200){
        console.log("success");
        setTodoValue("");
        getTasks();
      } else{
        throw new Error("Failed to add task");
      }
    } catch(error){
      console.log("error", error);
    }
  };

  const deleteTask=async(id)=>{
    try{
      const response=await api.delete(`/tasks/${id}`);
      if(response.status===200){
        console.log("success");
        getTasks();
      } else{
        throw new Error("Failed to delete task");
      }
    } catch(error){
      console.log("error",error);
    }
  };

  const completeTask=async(id)=>{
    try{
      
      const currentTask = todoList.find(task => task._id === id);
      const newCompleteState = !currentTask.isComplete;
      
      const response=await api.put(`/tasks/${id}`,{isComplete: newCompleteState});
      if(response.status===200){
        console.log("success");
        getTasks();
      } else{
        throw new Error("Failed to complete task");
      }
    } catch(error){
      console.log("error", error);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  useEffect(()=>{
    getTasks();
  },[])

  return (
    <div style={appStyle}>
      <div style={mainContainerStyle}>
        <div style={inputContainerStyle}>
          <input
            type="text"
            placeholder="NEW TASK"
            style={inputStyle}
            value={todoValue}
            onChange={(e)=>setTodoValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            style={addButtonStyle} 
            onClick={addTask}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.darkGray;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = colors.black;
            }}
          >
            <span style={{fontSize: '18px', fontWeight: 'bold'}}>+</span>
            ADD
          </button>
        </div>

        <TodoBoard todoList={todoList} deleteTask={deleteTask} completeTask={completeTask}/>
      </div>
    </div>
  );
}

export default App;
