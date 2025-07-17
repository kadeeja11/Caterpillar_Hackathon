// App.tsx
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import TaskDetailsPage from "./pages/TaskDetailsPage"
import LearningModulesPage from "./pages/LearningModulesPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/:operatorId" element={<Dashboard />} />
      <Route path="/task/:operatorId/:task" element={<TaskDetailsPage />} />
      <Route path="/learning/:operatorId/:task" element={<LearningModulesPage />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center p-10 text-gray-700">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg">The page you're looking for doesn't exist.</p>
            <a
              href="/"
              className="mt-6 inline-block bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition"
            >
              🔙 Back to Login
            </a>
          </div>
        }
      />
    </Routes>
  )
}

export default App
