import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get<User>(
          "http://localhost:3000/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (err) {
        const errorMessage =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to fetch user";
        console.error(errorMessage);
      }
    };

    getUser();
  }, []);

  return (
    <div className="mt-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">Profile</h1>
      </div>
      {user ? (
        <>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Hello, {user.name}
          </h2>
          <p className="text-xl md:text-2xl font-semibold mb-4">
            Your email is: <br />
            {user.email}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
