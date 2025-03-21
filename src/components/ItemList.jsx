import { useState, useEffect } from "react";
import axios from "axios";

const API_URI = "https://jsonplaceholder.typicode.com/posts"; // Replace with actual API

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch items on component mount
  useEffect(() => {
    axios
      .get(API_URI)
      .then((response) => setItems(response.data.slice(0, 5))) // Limiting to 5 items for demo
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // Handle delete request
  const handleDelete = (id) => {
    axios
      .delete(`${API_URI}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id)); // Remove from state
        setMessage("Item deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setMessage("Failed to delete item.");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Item List</h2>
      {message && <p className="mt-2 text-green-600">{message}</p>}

      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.title}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>Loading items...</p>
        )}
      </ul>
    </div>
  );
};

export default ItemList;
