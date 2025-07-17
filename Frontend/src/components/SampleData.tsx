// import React, { useEffect, useState } from "react"
// import { doc, getDoc } from "firebase/firestore"
// import { db } from "../firebase/firebaseConfig"

// const SampleData: React.FC = () => {
//   const [data, setData] = useState<{ name: string; phone: number } | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRef = doc(db, "sample_table", "details")
//         const docSnap = await getDoc(docRef)
//         if (docSnap.exists()) {
//           setData(docSnap.data() as { name: string; phone: number })
//         } else {
//           console.log("No such document!")
//         }
//       } catch (error) {
//         console.error("Error fetching document:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   if (loading) return <p className="text-gray-500">Loading...</p>
//   if (!data) return <p className="text-red-500">No data found.</p>

//   return (
//     <div className="bg-white shadow rounded p-4">
//       <p className="text-lg text-gray-800 font-semibold">Name: {data.name}</p>
//       <p className="text-gray-700">Phone: {data.phone}</p>
//     </div>
//   )
// }

// export default SampleData
