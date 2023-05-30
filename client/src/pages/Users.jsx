import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserModal } from "../modals";
import API_BASE_URL from "../assets/ApiConfig";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch user data from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
          params: {
            page: currentPage,
            limit: 9,
            sortBy: "asc",
          },
        });
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [isModalSubmitted, currentPage]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    setIsModalSubmitted(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderUserRow = () => {
    return users.map((user) => (
      <tr
        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
        key={user.id}
      >
        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.id}</td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt="Avatar"
              className="h-10 w-10 rounded-full"
            />
            <span className="ml-2">
              {user.nume} {user.prenume}
            </span>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
        <td className="whitespace-nowrap px-6 py-4">{user.role.nume}</td>
        <td className="whitespace-nowrap px-6 py-4">
          <button
            className="rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-700"
            onClick={() => handleEditUser(user)}
          >
            Modifică
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center text-xl font-semibold">Utilizatori</h1>
        <button
          className="rounded-md bg-blue-500 px-3 py-1 text-white"
          onClick={openModal}
        >
          Adăugare
        </button>
      </div>

      {users.length > 0 ? (
        <div className="flex flex-col">
          <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className=" overflow-hidden">
                <table className=" min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Nume
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Rol
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>

                  <tbody>{renderUserRow()}</tbody>
                </table>
              </div>
            </div>
          </div>

          {/** Paginare */}
          <div className="mt-4 flex items-center justify-between">
            <button
              className="rounded-md bg-blue-500 px-3 py-1 text-white"
              onClick={goToPreviousPage}
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="rounded-md bg-blue-500 px-3 py-1 text-white"
              onClick={goToNextPage}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
          Nu există utilizatori.
        </p>
      )}

      <UserModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSubmit={handleModalSubmit}
        editUser={editUser}
      />
    </div>
  );
};

export default Users;
