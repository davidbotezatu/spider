import { toast } from "react-toastify";

const HandleToast = (type, msg) => {
  const props = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  if (type === "success") {
    toast.success(msg, { ...props });
  } else {
    toast.error(msg, { ...props });
  }
};

export default HandleToast;
