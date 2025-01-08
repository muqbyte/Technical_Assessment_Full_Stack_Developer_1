import { useState } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const fetchDatabyId = () => {
  const [searchedData, setSearchedData] = useState<Item | null>(null);

  const handleSearch = async (searchId: string) => {
    console.log("id", searchId);
    if (!searchId.trim()) {
      setSearchedData(null); // Clear the search if searchId is empty
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_GET_DATA_BY_ID_API_URL}/${searchId}`);
      const result = await response.json();
      if (result && result.data) {
        const dataById = result.data[0];
        setSearchedData(dataById); // Store the searched item
        console.log("search data by id", dataById);
      } else {
        setSearchedData(null); // Clear the searched item if not found
      }
    } catch (error) {
      console.error("Error fetching searched item:", error);
      setSearchedData(null); // Clear search if there’s an error
    }
  };

  return { searchedData, handleSearch };
};

export default fetchDatabyId;
