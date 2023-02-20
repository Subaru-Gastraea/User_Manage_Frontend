import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(sessionStorage.getItem("userToken"));

    useEffect(() => {
        const fetchUser = async () => {
            const requestOp = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };

            const response = await fetch("/user/", requestOp);
            if (!response.ok) {
                setToken(null);
            }
            sessionStorage.setItem("userToken", token);
        };
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
};