import { BiClipboard } from "react-icons/bi";
import { BsBugFill, BsKanbanFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

export const links = [
  { name: "Proiecte", icon: <BiClipboard size={24} /> },
  { name: "Bugs", icon: <BsBugFill size={24} />, gap: true },
  { name: "Kanban", icon: <BsKanbanFill size={24} /> },
  { name: "Utilizatori", icon: <HiUserGroup size={24} />, gap: true },
];
