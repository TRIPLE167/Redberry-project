import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./components/Database-files/DataBase";
import TaskTracker from "./components/TaskTracker/TaskTracker";
import NewTask from "./components/NewTask/NewTask"; 

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TaskTracker />} />
          <Route path="/new-task" element={<NewTask />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
