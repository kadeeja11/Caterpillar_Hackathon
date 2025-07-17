import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ref, get } from "firebase/database"
import { db } from "../firebase/firebaseConfig"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "../components/ui/badge"

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
        const machineEntry = Object.values(data)[0] as MachineData // get first entry

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

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">Task: {task}</h2>

      <div className="bg-blue-100 p-3 rounded">
        🌦️ Current Weather: <strong>{weather || "Loading..."}</strong>
      </div>

      <div className="bg-yellow-100 p-3 rounded">
        <h4 className="font-semibold">Land Risk Profile:</h4>
        <ul className="list-disc ml-6">
          {landHistory.earthquakeProne && <li>Earthquake Prone Area</li>}
          {landHistory.cycloneProne && <li>Cyclone Prone Area</li>}
          {landHistory.floodZone && <li>Flood Zone</li>}
          {!landHistory.earthquakeProne &&
            !landHistory.cycloneProne &&
            !landHistory.floodZone && <li>Stable Terrain</li>}
        </ul>
      </div>

      {!seatbelt ? (
        <div className="bg-red-200 p-3 rounded text-red-700">
          🚨 Seatbelt is not fastened!
        </div>
      ) : (
        <div className="bg-green-200 p-3 rounded text-green-800">
          ✅ Seatbelt is fastened.
        </div>
      )}

      {machineData && (
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Risk Analysis: {machineData.machine_type.toUpperCase()}
            </CardTitle>
            <Badge
              className={`text-sm mt-2 ${
                getRiskAssessment(machineData).level === "High"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Risk Level: {getRiskAssessment(machineData).level}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>
              <strong>Tilt:</strong> {machineData["tiltAngle(°)"] || machineData["tilt"]}°
            </p>
            <p>
              <strong>Speed:</strong> {machineData["speed"]} km/h
            </p>
            <p>
              <strong>Load:</strong> {machineData["weightLoad(kg)"] || machineData["load_weight"]} kg
            </p>
            <p>
              <strong>Weather:</strong> {machineData.weather}
            </p>
            <p>
              <strong>Terrain:</strong> {machineData.terrain}
            </p>
            <p className="pt-2">
              <strong>Advice:</strong> {getRiskAssessment(machineData).advice}
            </p>
          </CardContent>
        </Card>
      )}

      <button
        className="bg-green-600 text-white p-2 px-4 rounded hover:bg-green-700"
        onClick={() => navigate(`/driving/${operatorId}/${task}`)}
      >
        Ready → Start Driving
      </button>
    </div>
  )
}

export default TaskDetailsPage
