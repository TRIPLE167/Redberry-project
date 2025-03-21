import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./components/Database-files/DataBase";
import TaskTracker from "./components/TaskTracker/TaskTracker";
import NewTask from "./components/NewTask/NewTask";
import SingleTask from "./components/singleTask/SingleTask";

function App() {
  return (
    <DataProvider>
      <Router basename="/Redberry-project/">
        <Routes>
          <Route path="/" element={<TaskTracker />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/task/:id" element={<SingleTask />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
