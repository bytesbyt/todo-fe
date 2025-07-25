import { useEffect, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks=async() => {
    const response = await api.get("/tasks")
    console.log("fff",response);
    setTodoList(response.data.data);
  };

  const addTask=async()=>{
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
      // 할일의 완료 상태 찾기
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



  useEffect(()=>{
    getTasks();
  },[])
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box" 
            value={todoValue}
            onChange={(e)=>setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask} completeTask={completeTask}/>
    </Container>
  );
}

export default App;
