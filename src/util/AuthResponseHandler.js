
import { toast } from 'react-toastify';

export const AuthResponseHandler = async (response) => {
    const data = await response.json();
    if (!data.isSuccess) {
        if (data.message.isArray) {
            const errors = JSON.parse(data.message);
            errors.forEach(({ Code, Description }) => {
                toast.error(Description, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"

                });
            });
            return null;
        }
        else {
            toast.error(data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"

            });
            return null;
        }



    }
    else if (data.isSuccess) {
        if (data.result.token) {
            sessionStorage.setItem("access_token", data.result.token);
            sessionStorage.setItem("bnid", data.result.token);
            return true;
        }
    }

}
