import React, { useState, useEffect } from "react";
import { db } from "../../../services/firebase"; // adjust the path as needed
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const HireMeManage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch hire requests from Firestore on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "hireRequests");
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(data);
      } catch (error) {
        console.error("Error fetching hire requests: ", error);
      }
      setLoading(false);
    };

    fetchRequests();
  }, []);

  // Toggle the "seen" status of a request
  const handleToggleSeen = async (request) => {
    try {
      const reqRef = doc(db, "hireRequests", request.id);
      const newSeenStatus = !request.seen;
      await updateDoc(reqRef, { seen: newSeenStatus });
      setRequests((prev) =>
        prev.map((r) =>
          r.id === request.id ? { ...r, seen: newSeenStatus } : r
        )
      );
      setMessage("Request status updated.");
    } catch (error) {
      console.error("Error updating status: ", error);
      setMessage("Error updating status.");
    }
  };

  // Delete a request from Firestore
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await deleteDoc(doc(db, "hireRequests", id));
        setRequests((prev) => prev.filter((r) => r.id !== id));
        setMessage("Request deleted.");
      } catch (error) {
        console.error("Error deleting request: ", error);
        setMessage("Error deleting request.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-b from-[#101820] to-[#131313] text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Hire Requests</h2>
      {message && <p className="mb-4 text-center text-green-400">{message}</p>}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400">No hire requests available.</p>
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
                  Project Details
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
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.projectDetails}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={request.seen || false}
                      onChange={() => handleToggleSeen(request)}
                      className="h-5 w-5"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {request.seen ? (
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
                      onClick={() => handleDelete(request.id)}
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

export default HireMeManage;
