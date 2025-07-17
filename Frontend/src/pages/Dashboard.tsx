import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"

function Dashboard() {
  const { operatorId } = useParams<{ operatorId: string }>()
  const navigate = useNavigate()

  const tasks = [
    "Mining",
    "Excavation", 
    "Grading",
    "Hauling",
    "Drilling",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-gray-200 px-4 relative overflow-hidden">
      {/* Caterpillar decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">
        🐛
      </div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-pulse">
        🐛
      </div>
      <div className="absolute top-1/2 left-5 text-3xl opacity-15 transform -rotate-45">
        🐛
      </div>
      <div className="absolute top-20 right-20 text-5xl opacity-15 transform rotate-12">
        🍃
      </div>
      <div className="absolute bottom-1/3 left-20 text-4xl opacity-10 transform -rotate-12">
        🍃
      </div>
      <div className="absolute top-1/3 right-10 text-3xl opacity-15 transform rotate-45">
        🐛
      </div>

      {/* Team302 Header Badge */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full shadow-lg border-2 border-black">
          <span className="tracking-wider">TEAM302 - CATERPILLAR CONTROL HUB</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-black mb-4 tracking-tight flex items-center justify-center gap-3">
            <span className="text-5xl">🚜</span>
            Hi {operatorId}!
            <span className="text-5xl">🚜</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Select your operation task
          </p>
          
          {/* Caterpillar divider */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-20"></div>
            <span className="text-2xl">🍃</span>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-20"></div>
          </div>
        </div>

        {/* Task Grid */}
        <div className="w-full max-w-xl grid gap-4">
          {tasks.map((task, index) => {
            const taskSlug = task.toLowerCase().replace(/\s+/g, "-")

            return (
              <Button
                key={index}
                onClick={() => navigate(`/task/${operatorId}/${taskSlug}`)}
                className="w-full h-16 text-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-black/10 hover:border-black/20 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🔧</span>
                {task}
                <span className="text-2xl">⚡</span>
              </Button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
            <span className="text-lg">🏆</span>
            <span>Powered by Team302</span>
            <span className="text-lg">🏆</span>
          </div>
          <div className="text-xs text-gray-400">
            &copy; 2025 Caterpillar Smart Operator Assistant
          </div>
        </div>
      </div>

      {/* Corner caterpillars */}
      <div className="absolute -bottom-2 -left-2 text-2xl opacity-30 transform rotate-45">
        🐛
      </div>
      <div className="absolute -top-2 -right-2 text-2xl opacity-30 transform -rotate-45">
        🐛
      </div>
    </div>
  )
}

export default Dashboard