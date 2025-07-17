import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

function Dashboard() {
  const { operatorId } = useParams<{ operatorId: string }>()
  const navigate = useNavigate()

  const tasks = [
    "Mining",
    "Excavation",
    "Grading and Demolition",
    "Hauling",
    "Drilling",
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 text-brand">
        Hi {operatorId}!
      </h1>

      <div className="w-full max-w-xl grid gap-4">
        {tasks.map((task, index) => {
          const taskSlug = task.toLowerCase().replace(/\s+/g, "-")

          return (
            <Button
              key={index}
              onClick={() => navigate(`/task/${operatorId}/${taskSlug}`)}
              className="w-full text-lg font-medium bg-brand hover:bg-brand-dark text-black"
            >
              {task}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
