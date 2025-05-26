import { toast } from "react-toastify"; 


export const handleSuccess = (message) => {
    toast.success(message, {
        position: 'top-right',
        // autoClose: 3000,
        // hideProgressBar: true,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        size: 'small',
    });
}

export const handleError = (message) => {
    toast.error(message, {
        position: 'top-right',
        // autoClose: 3000,
        // hideProgressBar: true,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        size: 'small',
    });
}