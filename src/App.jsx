import Home from "./pages/Home";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import TaskForm from "./components/TaskForm";
import UserForm from "./components/UserForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      {/* <LoginPage /> */}
      <Home />
      {/* <TaskForm />
      <UserForm /> 
      <Navbar/> */}
    </div>
  );
}

export default App;
