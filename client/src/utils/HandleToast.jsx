import { toast } from "react-toastify";

const HandleToast = (type, msg) => {
  console.log("called");
  const props = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  if (type === "success") {
    toast.success(msg, { ...props });
  } else if (type === "info") {
    toast.info(msg, { ...props });
  } else if (type === "fail") {
    toast.error(msg, { ...props });
  }
};

export default HandleToast;
