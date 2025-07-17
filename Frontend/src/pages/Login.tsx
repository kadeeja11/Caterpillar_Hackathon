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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md">
        <Card className="p-8 rounded-2xl shadow-xl border border-gray-200 bg-white animate-in fade-in zoom-in-75 duration-500">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-brand mb-2">
              Smart Operator Assistant
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Please enter your Operator ID and password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 text-base">
              <div className="space-y-1">
                <Label htmlFor="operatorId">Operator ID</Label>
                <Input
                  id="operatorId"
                  type="text"
                  placeholder="e.g. OP1001"
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  required
                  className="h-11 text-[16px]"
                />
              </div>

              <div className="space-y-1 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 text-[16px]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-muted-foreground hover:text-brand transition"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-brand hover:bg-brand-dark text-black text-base font-medium"
              >
                Login
              </Button>
            </form>
          </CardContent>

          <CardFooter className="pt-4 text-center text-sm text-gray-400">
            &copy; 2025 Smart Operator Assistant
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login
