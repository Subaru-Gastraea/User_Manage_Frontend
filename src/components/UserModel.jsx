import React, { useEffect, useState } from "react";

const UserModel = ({ active, handleModel, token, setToken, id, setErrorMessage }) => {
    const [birthday, setBirthday] = useState("");
    const [passwd, setPasswd] = useState("");

    useEffect(() => {
        const getUserData = async () => {
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
                setBirthday(data.birthday);
            }
        };

        if (id) {
            getUserData();
        }
    }, [id, token, setErrorMessage, setToken]);

    const cleanFormData = () => {
        setBirthday("");
        setPasswd("");
    };

    const handleUpdateLead = async (e) => {
        e.preventDefault();
        const requestOp = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                name: id,
                birthday: birthday,
                password: passwd,
            }),
        };
        const response = await fetch("/user/", requestOp);

        const data = await response.json();

        if (response.status === 401) // Unauthorized
        {
            setToken(null);
        } else {
            setToken(data.access_token);
        }

        if (!response.ok) {
            setErrorMessage("Failed to update user");
        } else {
            cleanFormData();
            handleModel();
        }
    };

    return (
        <div className={`modal ${active && "is-active"}`}>
            <div className="modal-background" onClick={handleModel}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <h1 className="modal-card-title">
                        Update User
                    </h1>
                </header>
                <section className="modal-card-body">
                    <form>
                        <div className="field">
                            <label className="label">Birthday</label>
                            <div className="control">
                            <input
                                type="text"
                                placeholder="Enter new birthday"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="input"
                                required
                            />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={passwd}
                                onChange={(e) => setPasswd(e.target.value)}
                                className="input"
                                required
                            />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot has-background-primary-light">
                    <button className="button is-info" onClick={handleUpdateLead}>
                        Update
                    </button>
                    <button className="button" onClick={handleModel}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default UserModel;
