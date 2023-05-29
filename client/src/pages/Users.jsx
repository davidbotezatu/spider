import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">All Users</h1>
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="">
                <th className="px-4 py-2">Nume</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{`${user.nume} ${user.prenume}`}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.rol}</td>
                  <td className="border px-4 py-2">
                    <button className="rounded-md bg-green-500 px-3 py-1 text-white hover:bg-red-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
          Nu există utilizatori.
        </p>
      )}
    </div>
  );
};

export default Users;
