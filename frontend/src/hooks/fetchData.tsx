import { useState, useEffect } from "react";

const fetchData = () => {
  interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
  }

  const [data, setData] = useState<Item[]>([]); // Stores all items data

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_ALL_DATA_API_URL);
        const result = await response.json();
        console.log(result)
        setData(result.data); // Assuming `result.data` contains an array of items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array makes it run only once

  return {data, setData}
  };

  export default fetchData;