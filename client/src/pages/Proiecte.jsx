import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";
import HandleToast from "../utils/HandleToast";
import { ProjectModal } from "../modals";
import { Pagination } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const Proiecte = () => {
  let nav = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const { currentPage, setTotalPages } = useStateContext();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects`, {
        params: {
          page: currentPage,
          limit: 9,
          sortBy: "asc",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setProjects(response.data.projects);
      setTotalPages(response.data.totalPages);
      setIsModalSubmitted(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      if (error.response && error.response.status === 403) {
        nav("/changepass");
        HandleToast("info", "Parola trebuie schimbată");
      }
    }
  };

  useEffect(() => {
    fetchProjects();
    setSelectedProjectId(localStorage.getItem("project_id"));
  }, [isModalSubmitted, currentPage]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalSubmit = () => {
    setIsModalSubmitted(true);
  };

  const handleEditProject = (project) => {
    setEditProject(project);
    toggleModal();
  };

  const handleAddProject = () => {
    setEditProject(null);
    toggleModal();
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    localStorage.setItem("project_id", projectId);
    window.location.reload();
  };

  let isAdmin = false;
  if (localStorage.getItem("user_rol") === "Administrator") {
    isAdmin = true;
  }

  const renderProjectRow = () => {
    return projects.map((project) => (
      <tr
        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
        key={project.id}
      >
        <td className="whitespace-nowrap px-6 py-4">
          <div className="flex items-center">
            <img
              src={project.avatar}
              alt="Avatar"
              className="h-10 w-10 rounded-full"
            />
            <span className="ml-2">{project.nume}</span>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">{project.descriere}</td>
        <td className="whitespace-nowrap px-6 py-4">
          {`${project.responsible.nume} ${project.responsible.prenume}`}
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          {isAdmin && (
            <button
              className="mr-5 w-28 rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-700"
              onClick={() => handleEditProject(project)}
            >
              Modifică
            </button>
          )}
          <button
            className={`rounded-md ${
              selectedProjectId == project.id ? "bg-amber-700" : "bg-blue-500"
            } w-28 px-3 py-1 text-white hover:bg-blue-700`}
            onClick={() => handleSelectProject(project.id)}
          >
            {selectedProjectId == project.id ? "Selectat" : "Selectează"}
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center text-xl font-semibold">Proiecte</h1>
        {isAdmin && (
          <button
            className="rounded-md bg-blue-500 px-3 py-1 text-white"
            onClick={() => handleAddProject()}
          >
            Adăugare
          </button>
        )}
      </div>

      {projects.length > 0 ? (
        <div className="flex flex-col">
          <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className=" overflow-hidden">
                <table className=" min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Nume
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Descriere
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Responsabil
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>{renderProjectRow()}</tbody>
                </table>
              </div>
            </div>
          </div>

          {/** Paginare */}
          <Pagination />
        </div>
      ) : (
        <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
          Nu există proiecte.
        </p>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        onSubmit={handleModalSubmit}
        editProject={editProject}
      />
    </div>
  );
};

export default Proiecte;
