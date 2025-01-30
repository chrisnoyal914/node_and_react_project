import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './logout';
import { useState } from 'react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactSupportClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const gradientBackground = {
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
  };

  return (
    isAuthenticated && (
      <div className="flex flex-col items-center justify-center min-h-screen p-8" style={gradientBackground}>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <img
            className="w-36 h-36 rounded-full mb-6 mx-auto border-4 border-gradient-to-r from-purple-400 to-blue-500 shadow-lg"
            src={user?.picture}
            alt="Profile"
          />
          <h2 className="font-extrabold text-3xl text-center text-gray-800 mb-2">{user?.name}</h2>
          <p className="font-medium text-center text-gray-600 mb-6">{user?.email}</p>
          <div className="flex justify-center mb-8">
            <LogoutButton />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => (window.location.href = '/portal')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg w-3/4 transition-transform duration-300 transform hover:scale-105"
            >
              Portal
            </button>
            <button
              onClick={() => (window.location.href = '/Dashboard')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg w-3/4 transition-transform duration-300 transform hover:scale-105"
            >
              Dashboard
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg mt-10 w-full max-w-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">User Information</h3>
          <p className="text-sm text-gray-600 mb-1">Username: <span className="font-medium">{user?.nickname || "N/A"}</span></p>
          <p className="text-sm text-gray-600">Joined: <span className="font-medium">August 2023</span></p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mt-10 w-full max-w-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you need assistance, our support team is here to help you with any issues or questions you may have. Click the button below to get in touch.
          </p>
          <button
            onClick={handleContactSupportClick}
            className="bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Contact Support
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h3>
              <p className="text-gray-600 mb-4">For any issues or inquiries, please reach out to our support team:</p>
              <p className="text-gray-800 mb-2">Email: <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a></p>
              <p className="text-gray-800">Phone: <span className="font-medium">+1-800-123-4567</span></p>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
