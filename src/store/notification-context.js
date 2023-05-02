import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
    activeNotification: null,
    showNotificationHandler: (notificationData) => {},
    hideNotificationHandler: () => {},
});

export const NotificationContextProvider = ({ children }) => {

    const [activeNotification, setActiveNotification] = useState();

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData)
    }

    const hideNotificationHandler = () => {
        setActiveNotification(null);
    }

    useEffect(() => {
        if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
            const timer = setTimeout(() => {
                hideNotificationHandler();
            }, 3000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification]);

    const value = {
        activeNotification,
        hideNotificationHandler,
        showNotificationHandler,
    };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export default NotificationContext;