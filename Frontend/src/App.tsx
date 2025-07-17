import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function App() {
  const [operatorId, setOperatorId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mock authentication logic - replace with your Firebase logic
    console.log("Login attempt:", { operatorId, password })
    
    // Add your Firebase authentication logic here
    try {
      // Placeholder for Firebase logic
      if (operatorId && password) {
        alert("✅ Login successful! (Demo mode)")
        // navigate(`/dashboard/${operatorId}`) - Add your navigation logic here
      } else {
        alert("❌ Please fill in all fields")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("❌ Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-gray-200 px-4 relative overflow-hidden">
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
      
      <Card className="w-[420px] p-8 rounded-3xl shadow-2xl border-2 border-yellow-300 bg-white/95 backdrop-blur-sm relative">
        {/* Team302 Badge */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-full shadow-lg border-2 border-black">
            <span className="text-sm tracking-wider">TEAM302</span>
          </div>
        </div>
        
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-3xl text-black mb-2 tracking-tight flex items-center justify-center gap-2">
            🐛 Caterpillar Control Hub 🐛
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Team302 Operator Access Portal
          </CardDescription>
          
          {/* Caterpillar divider */}
          <div className="flex items-center justify-center gap-2 mt-4 mb-2">
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1"></div>
            <span className="text-2xl">🍃</span>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1"></div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="operatorId" className="text-gray-700 flex items-center gap-2">
                <span className="text-lg">🔧</span>
                Operator ID
              </Label>
              <Input
                id="operatorId"
                type="text"
                placeholder="e.g. OP1001"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                required
                className="h-12 bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 rounded-xl border-2 border-gray-200 hover:border-yellow-300 transition-colors"
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-gray-700 flex items-center gap-2">
                <span className="text-lg">🔒</span>
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 pr-12 bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 rounded-xl border-2 border-gray-200 hover:border-yellow-300 transition-colors"
              />
              <button
                type="button"
                className="absolute right-4 top-[42px] text-gray-400 hover:text-yellow-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-black/10 hover:border-black/20"
            >
              <span className="flex items-center justify-center gap-2">
                🐛 Access Control System 🐛
              </span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-6 text-center">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="text-lg">🏆</span>
              <span>Powered by Team302</span>
              <span className="text-lg">🏆</span>
            </div>
            <div className="text-xs text-gray-400">
              &copy; 2025 Caterpillar Smart Operator Assistant
            </div>
          </div>
        </CardFooter>
        
        {/* Corner caterpillars */}
        <div className="absolute -bottom-2 -left-2 text-2xl opacity-30 transform rotate-45">
          🐛
        </div>
        <div className="absolute -top-2 -right-2 text-2xl opacity-30 transform -rotate-45">
          🐛
        </div>
      </Card>
    </div>
  )
}