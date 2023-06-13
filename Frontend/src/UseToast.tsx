import { toast } from "react-toastify";

function UseToast() {
  const ShowSuccess = (message: string) =>
    toast.success(message, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      autoClose: 5000,
    });
  const ShowInfo = (message: string) =>
    toast.info(message, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      autoClose: 5000,
    });
  const ShowWarning = (message: string) =>
    toast.warning(message, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      autoClose: false,
    });
  const ShowError = (message: string) =>
    toast.error(message, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      autoClose: false,
    });

  return { ShowError, ShowInfo, ShowSuccess, ShowWarning };
}

export default UseToast;
