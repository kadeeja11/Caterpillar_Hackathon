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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-white to-gray-300 px-6 font-poppins relative overflow-hidden">
      {/* Caterpillar decorative stripes */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full flex space-x-2 opacity-20 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full ${i % 2 === 0 ? "bg-yellow-400" : "bg-black"}`}
            style={{ height: "120%" }}
          />
        ))}
      </div>

      <Card className="relative w-[400px] p-8 rounded-3xl shadow-2xl border border-black bg-white z-10">
        <CardHeader className="text-center">
          {/* Caterpillar emoji + black-yellow theme */}
          <CardTitle className="text-3xl font-extrabold text-yellow-600 mb-2 tracking-widest select-none">
            🐛 Caterpillar Login
          </CardTitle>
          <CardDescription className="text-sm text-gray-700 font-semibold mb-4">
            Welcome back! Enter your credentials below.
          </CardDescription>
          {/* Team Name displayed prominently */}
          <div className="italic font-bold text-lg text-black tracking-wide select-none">
            Team302
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6 text-base">
            <div className="space-y-1">
              <Label
                htmlFor="operatorId"
                className="text-sm font-bold text-black"
              >
                Operator ID
              </Label>
              <Input
                id="operatorId"
                type="text"
                placeholder="e.g. OP1001"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                required
                className="h-10 text-[15px] bg-gray-100 border border-yellow-600 focus:ring-yellow-600 rounded-lg placeholder-yellow-600 focus:placeholder-transparent"
              />
            </div>

            <div className="space-y-1 relative">
              <Label
                htmlFor="password"
                className="text-sm font-bold text-black"
              >
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 text-[15px] pr-10 bg-gray-100 border border-yellow-600 focus:ring-yellow-600 rounded-lg placeholder-yellow-600 focus:placeholder-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-[38px] text-black hover:text-yellow-600 transition"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition duration-200 shadow-md shadow-yellow-300"
            >
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-4 text-center text-sm font-semibold text-gray-700 border-t border-yellow-400 select-none">
          &copy; 2025 Team302 — Smart Operator Assistant
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login