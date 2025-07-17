import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ref, get } from "firebase/database"
import { db } from "../firebase/firebaseConfig"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

interface LandHistory {
  earthquakeProne: boolean
  cycloneProne: boolean
  floodZone: boolean
}

interface MachineData {
  machine_type: string
  tilt: number
  tiltAngle: number
  load_weight: number
  weightLoad: number
  speed: number
  weather: string
  terrain: string
  seatbeltStatus: boolean
  earthquakeProneArea: string
  cycloneProneArea: string
  floodProneArea: string
  [key: string]: any
}

const taskVideos: Record<string, string[]> = {
  drilling: ["https://www.youtube.com/embed/8kY4F9LrN3Y"],
  mining: ["https://youtu.be/Wq9b-E5pCoI?si=oeqzUNuabzLdC_od"],
  excavation: ["https://www.youtube.com/embed/RpgNKL40O_4"],
  grading: ["https://www.youtube.com/embed/f1-LkJAmh80"],
  loading: ["https://www.youtube.com/embed/NtsDa1NnF3I"],
}

const TaskDetailsPage = () => {
  const { operatorId, task } = useParams()
  const navigate = useNavigate()

  const [weather, setWeather] = useState<string>("")
  const [seatbelt, setSeatbelt] = useState<boolean>(true)
  const [landHistory, setLandHistory] = useState<LandHistory>({
    earthquakeProne: false,
    cycloneProne: false,
    floodZone: false,
  })
  const [machineData, setMachineData] = useState<MachineData | null>(null)

  const fetchData = async () => {
    try {
      const snapshot = await get(ref(db, `machineData`))
      if (snapshot.exists()) {
        const data = snapshot.val()
        const machineEntry = Object.values(data)[0] as MachineData

        setSeatbelt(machineEntry.seatbeltStatus)
        setMachineData(machineEntry)
        setWeather(machineEntry.weather)

        setLandHistory({
          earthquakeProne: machineEntry.earthquakeProneArea === "yes",
          cycloneProne: machineEntry.cycloneProneArea === "yes",
          floodZone: machineEntry.floodProneArea === "yes",
        })
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const getRiskAssessment = (entry: MachineData) => {
    const { machine_type, tilt, load_weight, speed, weather, terrain } = entry
    switch (machine_type?.toLowerCase()) {
      case "excavator":
        if (tilt > 30 || load_weight > 18000 || speed > 15 || ["rocky", "muddy"].includes(terrain) || weather === "heavy_rain") {
          return {
            level: "High",
            advice: "Reduce tilt < 25°, speed < 12 km/h, avoid operation during heavy rain",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "bulldozer":
        if (tilt > 35 || speed > 12 || (terrain === "muddy" && ["rain", "heavy_rain"].includes(weather))) {
          return {
            level: "High",
            advice: "Lower blade height, reduce tilt < 30°, avoid muddy+rain combo",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "loader":
        if (tilt > 25 || speed > 20 || load_weight > 15000) {
          return {
            level: "High",
            advice: "Reduce speed < 18 km/h, keep load < 15T, minimize sharp turns on slope",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "grader":
      case "motor grader":
        if (
          tilt > 30 ||
          load_weight > 10000 ||
          speed > 30 ||
          terrain === "uneven" ||
          ["rain", "storm"].includes(weather.toLowerCase())
        ) {
          return {
            level: "High",
            advice: "Reduce tilt < 25°, keep load below 10T, slow speed on uneven terrain",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "dump truck":
      case "articulated truck":
        if (tilt > 20 || speed > 35 || load_weight > 30000 || terrain === "steep") {
          return {
            level: "High",
            advice: "Avoid sharp turns at high speed, load < 30T, reduce speed < 30 km/h",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "backhoe loader":
        if (tilt > 25 || speed > 15 || load_weight > 12000) {
          return {
            level: "High",
            advice: "Keep load < 12T, limit tilt < 20°, reduce speed",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "compactor":
        if (tilt > 15 || speed > 10) {
          return {
            level: "High",
            advice: "Limit operation on sloped terrain, reduce speed",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "scraper":
        if (tilt > 25 || speed > 30 || load_weight > 25000) {
          return {
            level: "High",
            advice: "Avoid overloading, reduce tilt < 20°, speed < 25 km/h",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "skid steer loader":
        if (tilt > 20 || speed > 12 || load_weight > 4000) {
          return {
            level: "High",
            advice: "Operate on flat terrain, keep load < 4T, limit tilt",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "crawler dozer":
      case "wheel dozer":
      case "track loader":
        if (tilt > 35 || speed > 10 || load_weight > 20000) {
          return {
            level: "High",
            advice: "Reduce tilt, operate on level ground, keep load moderate",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      case "hydraulic mining shovel":
        if (tilt > 25 || load_weight > 40000) {
          return {
            level: "High",
            advice: "Avoid overloading, tilt < 20° recommended",
          }
        }
        return { level: "Low", advice: "Safe operation" }

      default:
        return { level: "Unknown", advice: "Machine type not recognized" }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const videoLinks = task ? taskVideos[task.toLowerCase()] || [] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-gray-200 px-4 py-10 relative overflow-hidden">
      {/* Decorations (unchanged) */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🐛</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-pulse">🐛</div>
      <div className="absolute top-1/2 left-5 text-3xl opacity-15 transform -rotate-45">🐛</div>
      <div className="absolute top-20 right-20 text-5xl opacity-15 transform rotate-12">🍃</div>
      <div className="absolute bottom-1/4 left-20 text-4xl opacity-10 transform -rotate-12">🍃</div>
      <div className="absolute top-1/3 right-10 text-3xl opacity-15 transform rotate-45">🐛</div>

      {/* Header */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full shadow-lg border-2 border-black">
          <span className="tracking-wider">TEAM302 - TASK DETAILS</span>
        </div>
      </div>

      <div className="pt-28 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto relative z-10">
        {/* Left side: Task Details */}
        <div className="flex-1 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl text-black mb-4 capitalize flex items-center justify-center gap-3">
              <span className="text-4xl">🔧</span>
              Task: {task}
              <span className="text-4xl">⚡</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-32"></div>
              <span className="text-2xl">🍃</span>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-32"></div>
            </div>
          </div>

          <Card className="bg-blue-50/90 border-2 border-blue-200 rounded-xl shadow-lg backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌦️</span>
                <span className="text-lg">Current Weather: <strong>{weather || "Loading..."}</strong></span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50/90 border-2 border-yellow-200 rounded-xl shadow-lg backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                Land Risk Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc ml-6 space-y-1">
                {landHistory.earthquakeProne && <li>Earthquake Prone Area</li>}
                {landHistory.cycloneProne && <li>Cyclone Prone Area</li>}
                {landHistory.floodZone && <li>Flood Zone</li>}
                {!landHistory.earthquakeProne && !landHistory.cycloneProne && !landHistory.floodZone && <li>Stable Terrain</li>}
              </ul>
            </CardContent>
          </Card>

          <Card className={`border-2 rounded-xl shadow-lg backdrop-blur-sm ${
            !seatbelt ? "bg-red-50/90 border-red-200" : "bg-green-50/90 border-green-200"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {!seatbelt ? (
                  <>
                    <span className="text-2xl">🚨</span>
                    <span className="text-red-700">Seatbelt is not fastened!</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✅</span>
                    <span className="text-green-800">Seatbelt is fastened.</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {machineData && (
            <Card className="rounded-xl shadow-lg border-2 border-gray-200 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">🚜</span>
                  Risk Analysis: {machineData.machine_type.toUpperCase()}
                </CardTitle>
                <Badge
                  className={`text-sm mt-2 w-fit ${
                    getRiskAssessment(machineData).level === "High"
                      ? "bg-red-600 text-white border-red-700"
                      : "bg-green-600 text-white border-green-700"
                  }`}
                >
                  Risk Level: {getRiskAssessment(machineData).level}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Tilt:</strong> {machineData["tiltAngle(°)"] || machineData["tilt"]}°</p>
                  <p><strong>Speed:</strong> {machineData["speed"]} km/h</p>
                  <p><strong>Load:</strong> {machineData["weightLoad(kg)"] || machineData["load_weight"]} kg</p>
                  <p><strong>Weather:</strong> {machineData.weather}</p>
                  <p className="col-span-2"><strong>Terrain:</strong> {machineData.terrain}</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p><strong>🔍 Safety Advice:</strong> {getRiskAssessment(machineData).advice}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right side: Training Videos */}
        {videoLinks.length > 0 && (
        <div className="w-full lg:w-[400px] space-y-4 mt-[2000px]">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">📹 Training Video</h3>
            {videoLinks.map((url, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                src={url}
                title={`Training video ${index + 1}`}
                width="100%"
                height="220"
                frameBorder="0"
                allowFullScreen
                className="rounded-md"
                ></iframe>
            </div>
            ))}
        </div>
        )}

      </div>

      {/* Footer */}
      <div className="text-center pt-10 mt-12">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
          <span className="text-lg">🏆</span>
          <span>Powered by Team302</span>
          <span className="text-lg">🏆</span>
        </div>
        <div className="text-xs text-gray-400">&copy; 2025 Caterpillar Smart Operator Assistant</div>
      </div>

      <div className="absolute -bottom-2 -left-2 text-2xl opacity-30 transform rotate-45">🐛</div>
      <div className="absolute -top-2 -right-2 text-2xl opacity-30 transform -rotate-45">🐛</div>
    </div>
  )
}

export default TaskDetailsPage
