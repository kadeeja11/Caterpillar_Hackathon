import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase/firebaseConfig"
import { ref, get } from "firebase/database"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

function Login() {
  const [operatorId, setOperatorId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const operatorRef = ref(db, "machineData")
      const snapshot = await get(operatorRef)

      if (snapshot.exists()) {
        const data = snapshot.val()
        let found = false

        for (const key in data) {
          const entry = data[key]
          if (entry["operatorId"] === operatorId) {
            if (entry["password"] === password) {
              console.log("✅ Login successful")
              navigate(`/dashboard/${operatorId}`) // Redirect with operator ID
              found = true
              break
            } else {
              alert("❌ Incorrect password")
              found = true
              break
            }
          }
        }

        if (!found) {
          alert("❌ Operator ID not found")
        }
      } else {
        alert("❌ No data found in machineData")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("❌ Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-white to-gray-300 px-4 relative overflow-hidden">
      {/* Caterpillar-themed background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl animate-pulse">🐛</div>
        <div className="absolute top-20 right-20 text-6xl animate-bounce">🐛</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-pulse">🐛</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce">🐛</div>
      </div>

      {/* Decorative caterpillar stripes */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-4 bg-black transform rotate-45 absolute top-1/4 left-0 w-full"></div>
        <div className="h-4 bg-black transform rotate-45 absolute top-1/2 left-0 w-full"></div>
        <div className="h-4 bg-black transform rotate-45 absolute top-3/4 left-0 w-full"></div>
      </div>

      <Card className="w-[420px] p-8 rounded-3xl shadow-2xl border-2 border-yellow-400 bg-white relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="text-6xl animate-bounce">🐛</div>
          </div>
          <CardTitle className="text-3xl text-black mb-2 tracking-tight">
            Caterpillar Control Hub
          </CardTitle>
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-full inline-block mb-2">
            <span className="text-lg">Team302</span>
          </div>
          <CardDescription className="text-base text-gray-600">
            Transform your operations with secure login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="operatorId" className="text-sm text-gray-700 flex items-center gap-2">
                <span>🆔</span> Operator ID
              </Label>
              <Input
                id="operatorId"
                type="text"
                placeholder="e.g. OP1001"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                required
                className="h-12 bg-gray-50 border-2 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400 rounded-xl"
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-sm text-gray-700 flex items-center gap-2">
                <span>🔒</span> Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 pr-12 bg-gray-50 border-2 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400 rounded-xl"
              />
              <button
                type="button"
                className="absolute right-3 top-[42px] text-gray-400 hover:text-yellow-600 transition-colors text-lg"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black border-2 border-yellow-600 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span> Login
              </span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-6 text-center">
          <div className="w-full">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-2xl">🐛</span>
              <span className="text-lg text-yellow-600">Team302</span>
              <span className="text-2xl">🐛</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; 2025 Caterpillar Control Hub - Metamorphosis in Progress
            </p>
          </div>
        </CardFooter>

        {/* Decorative corner elements */}
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-black rounded-full border-2 border-yellow-400"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-black rounded-full border-2 border-yellow-400"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black"></div>
      </Card>
    </div>
  )
}

export default Login