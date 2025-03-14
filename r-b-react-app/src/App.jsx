import { useState } from "react";
import "./app.scss";
import Header from "./components/header/header";
import TaskTracker from "./components/TaskTracker/TaskTracker";
function App() {
  return (
    <div>
      <Header />
      <TaskTracker />
    </div>
  );
}

export default App;
