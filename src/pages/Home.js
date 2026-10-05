import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const createNewRoom = () => {
        const id = uuidV4();
        setRoomId(id);
        toast.success('Room created successfully!');
    };

    const joinRoom = () => {
        if (!roomId.trim()) {
            toast.error('ROOM ID is required');
            return;
        }

        if (!username.trim()) {
            toast.error('USERNAME is required');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: { username },
        });
    };

    const handleInputEnter = (e) => {
        if (e.key === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">

                <h1 className="appName">
                    Code<span>Room</span>
                </h1>

                <h4 className="mainLabel">
                    Join a coding room
                </h4>

                <div className="inputGroup">

                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        onKeyDown={handleInputEnter}
                    />

                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleInputEnter}
                    />

                    <button
                        className="btn joinBtn"
                        onClick={joinRoom}
                    >
                        JOIN
                    </button>

                    <div className="createInfo">
                        Don't have an invite?
                        <button
                            className="createNewBtn"
                            onClick={createNewRoom}
                        >
                            Create a new room
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;