import React from "react"
import SampleData from "../components/SampleData"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Caterpillar Dashboard</h1>
        <p className="text-gray-500">Welcome to your live backend-connected dashboard.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 mb-1">Users</h2>
          <p className="text-2xl font-semibold text-gray-800">1,204</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 mb-1">Reports</h2>
          <p className="text-2xl font-semibold text-gray-800">347</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 mb-1">Errors</h2>
          <p className="text-2xl font-semibold text-gray-800">7</p>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✔️ New user registered</li>
          <li>📊 Report generated</li>
          <li>⚠️ Error reported on form submission</li>
        </ul>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Backend Data</h2>
        <SampleData />
      </section>
    </div>
  )
}

export default Dashboard
