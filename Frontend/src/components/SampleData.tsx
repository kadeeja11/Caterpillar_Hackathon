// src/components/SampleData.tsx
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Data {
  name: string;
  number: string;
}

const SampleData: React.FC = () => {
  const [data, setData] = useState<Data>({ name: "", number: "" });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "sample_table", "details");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as Data);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sample Table Data</h2>
      <p>Name: {data.name}</p>
      <p>Number: {data.number}</p>
    </div>
  );
};

export default SampleData;
