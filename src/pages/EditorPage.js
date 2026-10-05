import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import ACTIONS from '../Actions';
import { initSocket } from '../socket.js';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const init = async () => {
            const handleError = (err) => {
                console.log('Socket connection error:', err);
                toast.error('Socket connection failed,try again later.');
                reactNavigator('/');
            };
            socketRef.current = await initSocket();
            setSocket(socketRef.current);
            socketRef.current.on('connect_error', (err) => handleError(err));
            socketRef.current.on('connect_failed', (err) => handleError(err));



            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room. `);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId
                    });



                }
            );
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} Left the Room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        )
                    })
                }
            );
        };

        init();
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
            }
        };
    }, []);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room Id has been copied to your clipboard.');

        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.log(err);

        }
    }
    function leaveRoom() {
        reactNavigator('/');
    }

    if (!location.state) {
        return <Navigate to="/" />
    }



    return (
        <div className="mainWrap">

            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <h2 className="appLogo">
                            Code<span>Room</span>
                        </h2>
                    </div>

                    <h3>Connected Users</h3>

                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>

                    <button className="btn copyBtn" onClick={copyRoomId}>
                        Copy Room ID
                    </button>

                    <button className="btn leaveBtn" onClick={leaveRoom}>
                        Leave
                    </button>

                </div>
            </div>

            <div className="editorWrap">
                {socket && (
                    <Editor
                        socketRef={socketRef}
                        roomId={roomId}
                        onCodeChange={(code) => {
                            codeRef.current = code;
                        }}
                    />
                )}
            </div>

        </div>
    );
};

export default EditorPage;