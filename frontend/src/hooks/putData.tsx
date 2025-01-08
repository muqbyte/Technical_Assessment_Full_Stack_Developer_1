// src/hooks/useItemSubmit.ts
import { useState } from 'react';
import axios from 'axios';

const putData = (selectedItem: any, formData: any, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    if (formData.price === 0 || formData.price < 0) {
      alert('Price must be in a positive value.');
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_PUT_DATA_BY_ID_API_URL}/${selectedItem.id}`, formData);
      alert('Item updated successfully.');
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item.');
      alert('Failed to update item.');
    }
  };

  return { handleSubmit, error };
};

export default putData;
