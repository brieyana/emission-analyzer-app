import { useState, useEffect } from "react";
import useAppStore from "../store/AppStore";

const Message = () => {
    const [visible, setVisible] = useState(false);

    const {
        error,
        setError,
        success,
        setSuccess,
        message
    } = useAppStore();

    useEffect(() => {
        if (error) {
            setVisible(true);
        }

        const timer = setTimeout(() => {
            setVisible(false);
            setError(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [error, setError])

    useEffect(() => {
        if (success) {
            setVisible(true);
        }

        const timer = setTimeout(() => {
            setVisible(false);
            setSuccess(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [success, setSuccess])

    return (
        (error ? (
        <div
            className={`fixed top-0 left-10 right-10 z-50 transform transition-all duration-500 ease-in-out ${
                visible ? "translate-y-8 opacity-100" : "-translate-y-full opacity-0"
            } flex items-center gap-6 text-[#931212] h-fit border border-solid border-[#931212] bg-[#FCE6E6] rounded-md p-8 shadow-md`}
        >
            {message}
        </div>) : 
        (<div
            className={`fixed top-0 left-10 right-10 z-50 transform transition-all duration-500 ease-in-out ${
                visible ? "translate-y-8 opacity-100" : "-translate-y-full opacity-0"
            } flex items-center gap-6 text-[#7FB98A] h-fit border border-solid border-[#129316] bg-[#F1FCE6] rounded-md p-8 shadow-md`}
        >
            {message}
        </div>))
    );
};

export default Message;
