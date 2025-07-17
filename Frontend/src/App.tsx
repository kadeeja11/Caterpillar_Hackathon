// App.tsx
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import TaskDetailsPage from "./pages/TaskDetailsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/:operatorId" element={<Dashboard />} />
      <Route path="/task/:operatorId/:task" element={<TaskDetailsPage />} />
    </Routes>
  )
}

export default App
