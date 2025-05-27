import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiLayers,
  FiUser,
  FiBriefcase,
  FiGrid,
  FiAward,
  FiBookOpen,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { auth, db } from "../../../services/firebase"; // adjust the path as needed
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, authLoading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Fetch additional user data from Firestore using the user's UID
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No user document found in the 'Users' collection.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoadingUserData(false);
    };

    fetchUserData();
  }, [user]);

  // Logout function with debug logs and redirection
  const handleLogout = async () => {
    console.log("Attempting to log out...");
    setLogoutLoading(true);
    try {
      await signOut(auth);
      console.log("Logout successful!");
      // Redirect to login page after logout
      navigate("/LoginPage");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
    setLogoutLoading(false);
  };

  // Define the navigation menu items with correct admin paths
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome className="mr-4 text-2xl" /> },
    { path: "/dashboard/hero", label: "HERO SECTION", icon: <FiLayers className="mr-4 text-2xl" /> },
    { path: "/dashboard/about", label: "ABOUT SECTION", icon: <FiUser className="mr-4 text-2xl" /> },
    { path: "/dashboard/work", label: "WORK EXPERIENCE", icon: <FiBriefcase className="mr-4 text-2xl" /> },
    { path: "/dashboard/skills", label: "Portfolio/Projects", icon: <FiGrid className="mr-4 text-2xl" /> },
    { path: "/dashboard/certificates", label: "CERTIFICATES", icon: <FiAward className="mr-4 text-2xl" /> },
    { path: "/dashboard/blog", label: "BLOG", icon: <FiBookOpen className="mr-4 text-2xl" /> },
    { path: "/dashboard/contact", label: "Contact", icon: <FiPhone className="mr-4 text-2xl" /> },
    { path: "/dashboard/hireme", label: "Hire me", icon: <FiSend className="mr-4 text-2xl" /> },
  ];

  // Fallback defaults if userData is not available
  const userPhoto = userData && userData.image ? userData.image : "https://i.pravatar.cc/40?img=5";
  const userName = userData && userData.Name ? userData.Name : "John Doe";

  return (
    <aside className="fixed top-0 left-0 bg-green-900 text-white h-screen w-64 p-6 flex flex-col">
      {/* Logo and Brand Name */}
      <div className="mb-10 flex items-center gap-3">
        <div className="bg-green-700 p-2 rounded-full">
          <FiHome className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center p-3 rounded transition-colors mb-2 ${
                isActive ? 'bg-green-800' : 'hover:bg-green-700'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="mt-auto pt-6 border-t border-green-800">
        <div className="flex items-center gap-3">
          {(authLoading || loadingUserData) ? (
            // Spinner for loading state
            <div className="w-10 h-10 flex items-center justify-center">
              <svg
                className="animate-spin h-6 w-6 text-white"
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
            <img
              src={userPhoto}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-green-600"
            />
          )}
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="text-xs text-green-300 hover:underline"
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
