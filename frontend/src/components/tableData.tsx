import { useState } from "react";
import fetchData from "../hooks/fetchData";
import fetchDatabyId from "../hooks/fetchDataById";
import useDeleteItem from "../hooks/deleteData"; // Import the useDeleteItem hook
import axios from "axios";

const TableData = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [searchingById, setSearchingById] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null); // To store the item to be edited
  const [isEditing, setIsEditing] = useState(false); // To toggle between editing and viewing table
  const { data } = fetchData();
  const { searchedData, handleSearch } = fetchDatabyId();
  const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
  const { handleDelete } = useDeleteItem(setIsEditing); // Use the handleDelete from the custom hook

  // Handle input change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Save/Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    if (formData.price === 0 || formData.price < 0) {
      alert("Price must be in a positive value.");
      return;
    }

    try {
      axios.put(`http://localhost:8778/put/items/${selectedItem.id}`, formData);
      alert("Item updated successfully.");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };

  // Update form data when an item is selected for editing
  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
    });
    setIsEditing(true);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Button to toggle search mode */}
      <div className="flex flex-row items-center justify-center mb-2">
        {!searchingById && (
          <button
            onClick={() => setSearchingById(true)}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            SEARCH BY ID
          </button>
        )}
      </div>

      {/* Search Bar - only visible when searchingById is true */}
      {searchingById && (
        <div className="flex items-center my-4 space-x-2">
          <input
            type="number"
            placeholder="Enter item ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={() => handleSearch(searchId)}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      )}

      {/* Button to return to full data view */}
      {searchingById && (
        <button
          onClick={() => setSearchingById(false)}
          className="px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Return to View All Data
        </button>
      )}

      {/* Show the details form when editing */}
      {isEditing && selectedItem && (
        <div className="max-w-screen-lg mx-auto">
          <h2 className="mb-4 text-sm font-bold">Edit Item</h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange} // Use handleChange function
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange} // Use handleChange function
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange} // Use handleChange function
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-row justify-evenly">
              <button
                type="button"
                onClick={() => handleDelete(selectedItem?.id)} // Call handleDelete for deleting the item
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-sm hover:bg-red-700"
              >
                Delete
              </button>

              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-green-600 rounded-sm hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>

          <button
            onClick={() => setIsEditing(false)} // Go back to table view
            className="px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            Return to Table View
          </button>
        </div>
      )}

      {/* Table - only visible when not editing */}
      {!isEditing && !searchingById && (
        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-80">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 odd:bg-gray-50 even:bg-white"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">${item.price}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditClick(item)} // Set selected item and populate form
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* After searching, show the result or 'no data available' */}
      {searchingById && searchedData && (
        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                key={searchedData.id}
                className="border-b border-gray-200 odd:bg-gray-50 even:bg-white"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{searchedData.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{searchedData.name}</td>
                <td className="px-6 py-4">{searchedData.description}</td>
                <td className="px-6 py-4">${searchedData.price}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => alert(`Action for ${searchedData.name}`)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* If no searched data found */}
      {searchingById && searchedData === null && (
        <p className="mt-4 text-center text-gray-500">No item found</p>
      )}
    </div>
  );
};

export default TableData;
