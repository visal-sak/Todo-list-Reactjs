import { useState, useEffect } from 'react';
import 'flowbite';

const Notification = ({ message, type, onClose }) => (
  <div className="fixed top-5 right-5 z-50 w-full max-w-xs">
    <div className={`flex items-center p-4 mb-4 text-sm border rounded-lg ${type === 'error' ? 'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800' : 'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800'}`} role="alert">
        <div className="flex-grow">
        <span className="font-medium">{type === 'error' ? 'Error!' : 'Success!'}</span> {message}
      </div>
      <button onClick={onClose} className="ml-2 text-red-700 hover:text-red-900">
        &times;
      </button>
    </div>
  </div>
);

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAdd = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
      setNotification({ message: 'Item added successfully!', type: 'success' });
    }
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    setNotification({ message: 'Item deleted successfully!', type: 'error' });
  };

  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    if (newItem.trim()) {
      const updatedItems = items.map((item, i) => (i === editIndex ? newItem.trim() : item));
      setItems(updatedItems);
      setNewItem('');
      setEditIndex(null);
      setNotification({ message: 'Item updated successfully!', type: 'success' });
    }
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedItems = [...items];
      [updatedItems[index - 1], updatedItems[index]] = [updatedItems[index], updatedItems[index - 1]];
      setItems(updatedItems);
    }
  };

  const handleMoveDown = (index) => {
    if (index < items.length - 1) {
      const updatedItems = [...items];
      [updatedItems[index + 1], updatedItems[index]] = [updatedItems[index], updatedItems[index + 1]];
      setItems(updatedItems);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {notification.message && <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />}
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <button
          onClick={editIndex !== null ? handleUpdate : handleAdd}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-2 ml-2"
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className="flex-grow">{item}</span>
            <button
              onClick={() => handleEdit(index)}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-2 ml-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-2 ml-2 "
            >
              Delete
            </button>
            <button
              onClick={() => handleMoveUp(index)}
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-2 ml-2"
            >
              Move Up
            </button>
            <button
              onClick={() => handleMoveDown(index)}
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-2 ml-2"
            >
              Move Down
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
