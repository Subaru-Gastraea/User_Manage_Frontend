import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import UserModel from "./UserModel";
import { UserContext } from "../context/UserContext";

const Table = () => {
    const [token, setToken] = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModel, setActiveModel] = useState(false);
    const [id, setId] = useState(null);

    const handleUpdate = async (id) => {
        setId(id);
        setActiveModel(true);
    };

    const getUser = async () => {
        const requestOp = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("/user/", requestOp);

        if (response.status === 401) // Unauthorized
        {
            setToken(null);
        }

        if (!response.ok) {
            setErrorMessage("Failed to get user data");
        } else {
            const data = await response.json();
            setUser(data);
            setLoaded(true);
        }
    };

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);

    const handleModel = () => {
        setActiveModel(!activeModel);
        getUser();
        setId(null);
    };

    return (
        <>
            <UserModel
                active={activeModel}
                handleModel={handleModel}
                token={token}
                setToken={setToken}
                id={id}
                setErrorMessage={setErrorMessage}
            />
            <ErrorMessage message={errorMessage} />
            {loaded && user ? (
            <table className="table is-fullwidth">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Birthday</th>
                    <th>Create time</th>
                    <th>Last login</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{user.name}</td>
                    <td>{moment(user.birthday).format("MMMM Do YYYY")}</td>
                    <td>{moment(user.createT).format("YYYY-MM-DD HH:mm Z")}</td>
                    <td>{moment(user.last_login).format("YYYY-MM-DD HH:mm Z")}</td>
                    <td>
                        <button
                            className="button mr-2 is-info is-light"
                            onClick={() => handleUpdate(user.name)}
                        >
                            Update
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            ) : (
            <p>Loading</p>
            )}
        </>
    );
};

export default Table;
