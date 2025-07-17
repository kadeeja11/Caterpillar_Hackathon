import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const equipmentVideos: Record<string, string[]> = {
  Excavator: [
    "https://www.youtube.com/embed/dZ9eWnTnVaM",
    "https://www.youtube.com/embed/eq6bUyaHfAo",
  ],
  Bulldozer: [
    "https://www.youtube.com/embed/FGME7iMm1cs",
    "https://www.youtube.com/embed/V3lKgz7XDaM",
  ],
  Loader: [
    "https://www.youtube.com/embed/CwQLNBjwUIM",
    "https://www.youtube.com/embed/EXAMPLE_LOADER_2",
  ],
  Grader: [
    "https://www.youtube.com/embed/Hb-MqDStazQ",
    "https://www.youtube.com/embed/EXAMPLE_GRADER_2",
  ],
  "Dump Truck": [
    "https://www.youtube.com/embed/nD9xzLztKis",
    "https://www.youtube.com/embed/EXAMPLE_DUMP_2",
  ],
  "Backhoe Loader": [
    "https://www.youtube.com/embed/Q53yXqXYKxM",
    "https://www.youtube.com/embed/EXAMPLE_BACKHOE_2",
  ],
  Compactor: [
    "https://www.youtube.com/embed/EXAMPLE_COMPACTOR_1",
    "https://www.youtube.com/embed/EXAMPLE_COMPACTOR_2",
  ],
  Scraper: [
    "https://www.youtube.com/embed/EXAMPLE_SCRAPER_1",
    "https://www.youtube.com/embed/EXAMPLE_SCRAPER_2",
  ],
  "Skid Steer Loader": [
    "https://www.youtube.com/embed/EXAMPLE_SKID_1",
    "https://www.youtube.com/embed/EXAMPLE_SKID_2",
  ],
  "Crawler Dozer": [
    "https://www.youtube.com/embed/EXAMPLE_CRAWLER_1",
    "https://www.youtube.com/embed/EXAMPLE_CRAWLER_2",
  ],
  "Wheel Dozer": [
    "https://www.youtube.com/embed/EXAMPLE_WHEEL_1",
    "https://www.youtube.com/embed/EXAMPLE_WHEEL_2",
  ],
  "Track Loader": [
    "https://www.youtube.com/embed/EXAMPLE_TRACK_1",
    "https://www.youtube.com/embed/EXAMPLE_TRACK_2",
  ],
  "Hydraulic Mining Shovel": [
    "https://www.youtube.com/embed/EXAMPLE_HYDRAULIC_1",
    "https://www.youtube.com/embed/EXAMPLE_HYDRAULIC_2",
  ],
  "Motor Grader": [
    "https://www.youtube.com/embed/EXAMPLE_MOTORGRADER_1",
    "https://www.youtube.com/embed/EXAMPLE_MOTORGRADER_2",
  ],
  "Articulated Truck": [
    "https://www.youtube.com/embed/EXAMPLE_ARTICULATED_1",
    "https://www.youtube.com/embed/EXAMPLE_ARTICULATED_2",
  ],
}

const LearningModulesPage = () => {
  const { operatorId, task } = useParams()
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold">🎥 Learning Modules</h2>
      <p className="text-gray-700">
        Below are recommended training videos for all equipment types.
      </p>

      {Object.entries(equipmentVideos).map(([equipment, videoUrls]) => (
        <div key={equipment}>
          <h3 className="text-xl font-semibold mt-6 mb-2">{equipment}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoUrls.map((url, index) => (
              <Card key={index} className="overflow-hidden rounded-xl border shadow">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    Module {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={url}
                      title={`Module ${index + 1}`}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-64"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => navigate(`/task/${operatorId}/${task}`)}
        className="mt-10 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        ← Back to Task Page
      </button>
    </div>
  )
}

export default LearningModulesPage
