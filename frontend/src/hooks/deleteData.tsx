// src/hooks/useDeleteItem.ts
import { useState } from 'react';
import axios from 'axios';

const deleteData = (setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string | number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_DELETE_DATA_BY_ID_API_URL}/${id}`);
      alert('Item deleted successfully.');
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item.');
      alert('Failed to delete item.');
    }
  };

  return { handleDelete, error };
};

export default deleteData;
