import { BiClipboard } from "react-icons/bi";
import { BsBugFill, BsKanbanFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

export const links = [
  {
    title: "Proiecte",
    links: [
      {
        name: "Proiecte",
        icon: <BiClipboard />,
      },
      {
        name: "Bugs",
        icon: <BsBugFill />,
      },
      {
        name: "Kanban",
        icon: <BsKanbanFill />,
      },
    ],
  },

  {
    title: "Administrare",
    links: [
      {
        name: "Utilizatori",
        icon: <HiUserGroup />,
      },
    ],
  },
];
