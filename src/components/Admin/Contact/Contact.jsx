import React, { useState, useEffect } from "react";
import { db } from "../../../services/firebase"; // adjust the path as needed
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ContactManage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Fetch contact messages from Firestore on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "contactMessages");
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(data);
      } catch (error) {
        console.error("Error fetching contact messages: ", error);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  // Toggle the "seen" status of a message
  const handleToggleSeen = async (messageItem) => {
    try {
      const msgRef = doc(db, "contactMessages", messageItem.id);
      const newSeenStatus = !messageItem.seen;
      await updateDoc(msgRef, { seen: newSeenStatus });
      setMessages((prev) =>
        prev.map((item) =>
          item.id === messageItem.id ? { ...item, seen: newSeenStatus } : item
        )
      );
      setMsg("Message status updated.");
    } catch (error) {
      console.error("Error updating status: ", error);
      setMsg("Error updating status.");
    }
  };

  // Delete a message from Firestore
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "contactMessages", id));
        setMessages((prev) => prev.filter((item) => item.id !== id));
        setMsg("Message deleted.");
      } catch (error) {
        console.error("Error deleting message: ", error);
        setMsg("Error deleting message.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-b from-[#101820] to-[#131313] text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Contact Messages</h2>
      {msg && <p className="mb-4 text-center text-green-400">{msg}</p>}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-400">No contact messages available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Seen
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {messages.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={item.seen || false}
                      onChange={() => handleToggleSeen(item)}
                      className="h-5 w-5"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.seen ? (
                      <span className="px-2 py-1 bg-green-600 rounded-full text-xs font-bold">
                        Good
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-600 rounded-full text-xs font-bold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactManage;
