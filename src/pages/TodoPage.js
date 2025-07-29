import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";

function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

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

  const handleLogout = () => {

    sessionStorage.removeItem("token");
    delete api.defaults.headers["authorization"];
    navigate("/login");
  };

  useEffect(()=>{
    getTasks();
  },[])

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="logout-button-container" style={{marginBottom: '20px'}}>
          <button onClick={handleLogout} className="form-button logout-top-button">
            Logout
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="NEW TASK"
            className="input-field"
            value={todoValue}
            onChange={(e)=>setTodoValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="button-primary"
            onClick={addTask}
          >
            <span className="button-icon">+</span>
            ADD
          </button>
        </div>

        <TodoBoard todoList={todoList} deleteTask={deleteTask} completeTask={completeTask}/>
      </div>
    </div>
  );
}

export default TodoPage;
