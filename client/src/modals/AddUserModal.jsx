import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import validation from "../validations/AddUserValidation";
import API_BASE_URL from "../assets/ApiConfig";
import AvatarField from "../components/AvatarField";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

Modal.setAppElement("#root");

const AddUserModal = ({ isOpen, closeModal }) => {
  const [roles, setRoles] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [mustResetPassword, setMustResetPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

  const submitForm = (data) => {
    console.log(data, avatar);
  };

  const handleAvatarChange = (value) => {
    setAvatar(value);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/userroles`);
        const data = response.data;
        setRoles(data);
      } catch (error) {
        console.error("Failed to fetch user roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleResetPasswordChange = (event) => {
    setMustResetPassword(event.target.checked);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add User Modal"
      className="modal fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="modal-content z-50 rounded-lg bg-white p-4">
        <div className="mb-4 flex justify-between">
          <h1 className="mr-4 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Adăugare utilizator nou
          </h1>
          <button className="text-gray-500" onClick={closeModal}>
            <FiX size={24} />
          </button>
        </div>
        <form action="#" onSubmit={handleSubmit(submitForm)}>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              {/* Avatar field */}
              <AvatarField onChange={handleAvatarChange} />

              {/** Nume + validari */}
              <div>
                <label
                  htmlFor="nume"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu numele utilizatorului
                </label>
                <input
                  type="text"
                  name="nume"
                  id="nume"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Popescu"
                  {...register("nume")}
                />
                {errors.nume && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.nume.message}
                  </p>
                )}
              </div>

              {/** Prenume + validari */}
              <div>
                <label
                  htmlFor="prenume"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu prenumele utilizatorului
                </label>
                <input
                  type="text"
                  name="prenume"
                  id="prenume"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Ion"
                  {...register("prenume")}
                />
                {errors.prenume && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.prenume.message}
                  </p>
                )}
              </div>

              {/** Adresa de email + validari */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu adresa de email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="nume.prenume@companie.ro"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/** Parola + validari */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu parola contului
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/** Rol utilizator */}
              <div>
                <label
                  htmlFor="rol"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Selecteaza rolul utilizatorului
                </label>
                <select
                  name="rol"
                  id="rol"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register("rol")}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.nume}
                    </option>
                  ))}
                </select>
                {errors.rol && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.rol.message}
                  </p>
                )}
              </div>

              {/** Reseteaza parola la login */}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="changePass"
                    aria-describedby="changePass"
                    type="checkbox"
                    checked={mustResetPassword}
                    onChange={() => setMustResetPassword(!mustResetPassword)}
                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="changePass"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Schimbă parola la login
                  </label>
                </div>
              </div>

              {/** Buton submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Continuă
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
