import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm} from '../features/formSlice';
import { RootState, AppDispatch } from '../store/store';

const FormComponent= () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.form);

  const [formData, setFormData] = useState({ name: '', description: '',price:0});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    if (formData.price === 0 || formData.price < 0) {
      alert("Price must in positive value.");
      return;
    }

    // Dispatch the form submission if validation passes
    dispatch(submitForm(formData));

    // Optional: Reload page after submission
    window.location.reload();
  };


  //this is for the reset button, to clear the input box


  return (
    <div className="w-full max-w-xs" >
      {/* <h1>Submit Form</h1> */}
      {success && <p>Form submitted successfully!</p>}
      {error && <p>Error: {error}</p>}

      <form onSubmit={handleSubmit} className='px-6 pt-4 pb-6 mb-4 bg-white rounded shadow-md'>
        <div>

        <div className='mb-4'>
          <label className='mb-2 text-sm font-bold text-gray-700'>
            Name:
            </label> 
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none'
            />
        </div>
        <div className='mb-4'>
          <label className='mb-2 text-sm font-bold text-gray-700'>
            Description:
            </label> 
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className='w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none'
            />
        </div>
        <div className='mb-4'>
          <label className='mb-2 text-sm font-bold text-gray-700'>
            Price:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className='w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none'
              required
            />
        </div>
        </div>
        <div className='flex flex-row justify-center'>
            <button type="submit" disabled={loading} className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
            {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
