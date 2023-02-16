import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import io from 'socket.io-client'
import { useSelector } from 'react-redux';

const useSocket = (validPathname) => {
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();

    //tworzenie połaczenia do socket jeśli jest poprawne url

    useEffect(() => {
        (() => {

            if (!validPathname.includes(window.location.pathname.split("/")[1]) || (socket && socket.connected)) {
                return false;
            }

            const newSocket = io("http://localhost:5000");
            dispatch({ type: 'socket', socket: newSocket });
            return () => newSocket.close()

        })();

    }, [])

};

export default useSocket;