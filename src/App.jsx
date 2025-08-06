import React, { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      category,
      description
    };

    const formData = new FormData();
    formData.append("product", JSON.stringify(productData)); 
    if (image) {
      formData.append("image", image); 
    }

    try {
      const response = await fetch("http://localhost:3000/api/products/create", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        alert("Product created successfully");
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImage(null);
      } else {
        const errorData = await response.json();
        alert("Failed to create item: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="women">women</option>
            <option value="man">man</option>
            <option value="kid">kid</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
