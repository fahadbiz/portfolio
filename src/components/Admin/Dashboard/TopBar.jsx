import React, { useEffect, useState } from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase"; // adjust the path as needed

const TopBar = () => {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const colRef = collection(db, "Users");
        const snapshot = await getDocs(colRef);
        if (!snapshot.empty) {
          // For simplicity, we use the first document as the current user data
          const dataList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUserData(dataList[0]);
        } else {
          console.log("No user data available in the 'Users' collection.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      }
      setLoadingUser(false);
    };

    fetchUserData();
  }, []);

  // Fallback defaults if userData is not available
  const userPhoto = userData && userData.image ? userData.image : "https://i.pravatar.cc/40?img=5";
  const userName = userData && userData.Name ? userData.Name : "John Doe";

  return (
    <header className="flex items-center justify-between bg-gray-900 px-6 py-4 border-b border-gray-700">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-full max-w-md">
        <FiSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none flex-grow text-gray-200 placeholder-gray-500"
        />
      </div>
      {/* Right side: Notification & User Info */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-gray-700 transition">
          <FiBell size={24} className="text-gray-200" />
          <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-3">
          {loadingUser ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <svg
                className="animate-spin h-6 w-6 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <img
                src={userPhoto}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-green-600"
              />
              <span className="font-medium text-gray-200">{userName}</span>
            </>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-2">
          Error: {error}
        </div>
      )}
    </header>
  );
};

export default TopBar;
