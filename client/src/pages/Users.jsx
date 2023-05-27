import React, { useEffect, useState } from "react";
const Users = () => {
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  const fetchAdminUser = async () => {
    try {
      const response = await fetch("/api/admin"); // Adjust the endpoint URL accordingly
      const data = await response.json();
      setAdminUser(data);
    } catch (error) {
      console.error("Error fetching admin user:", error);
    }
  };

  return (
    <div>
      <h1>Admin User</h1>
      {adminUser ? (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{adminUser.email}</td>
              <td>{`${adminUser.nume} ${adminUser.prenume}`}</td>
              <td>{adminUser.rol}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Users;
