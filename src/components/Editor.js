import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);

    // Keep the latest values without making the CodeMirror effect rerun
    const onCodeChangeRef = useRef(onCodeChange);
    const roomIdRef = useRef(roomId);

    onCodeChangeRef.current = onCodeChange;
    roomIdRef.current = roomId;

    useEffect(() => {
        // Capture the socket used by this editor instance
        const socket = socketRef.current;

        const editor = CodeMirror.fromTextArea(
            document.getElementById('realtimeEditor'),
            {
                mode: {
                    name: 'javascript',
                    json: true,
                },
                theme: 'material-darker',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                direction: 'ltr',
            }
        );

        editorRef.current = editor;

        editor.on('change', (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();

            onCodeChangeRef.current(code);

            if (origin !== 'setValue') {
                socket.emit(ACTIONS.CODE_CHANGE, {
                    roomId: roomIdRef.current,
                    code,
                });
            }
        });

        const handleCodeChange = ({ code }) => {
            if (
                code !== null &&
                code !== editor.getValue()
            ) {
                editor.setValue(code);
            }
        };

        socket.on(ACTIONS.CODE_CHANGE, handleCodeChange);

        return () => {
            socket.off(ACTIONS.CODE_CHANGE, handleCodeChange);
            editor.toTextArea();
            editorRef.current = null;
        };
    }, [socketRef]);

    return (
        <textarea
            id="realtimeEditor"
            dir="ltr"
        ></textarea>
    );
};

export default Editor;