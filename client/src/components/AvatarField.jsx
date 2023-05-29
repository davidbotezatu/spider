import React, { useState } from "react";

const AvatarField = ({ onChange }) => {
  const defaultAvatar = "/src/assets/avatar.png";
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleUrlChange = (event) => {
    const url = event.target.value.trim();

    if (url) {
      setAvatar(url);
      onChange(url);
    } else {
      setAvatar(defaultAvatar);
      onChange(defaultAvatar);
    }
  };

  return (
    <div>
      <label
        htmlFor="avatar"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Adaugă un avatar
      </label>
      <div className="flex items-center">
        <img
          src={avatar}
          alt="Avatar"
          className="mr-4 h-16 w-16 rounded-full"
        />
        <div>
          <input
            type="text"
            placeholder="Enter image URL"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            onChange={handleUrlChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarField;
