import Contacts from './contacts/Contacts';
import Persons from './persons/Persons';
import Chat from './chat/Chat';
import { Routes, Route } from "react-router-dom";
import useSocket from '../../hooks/socket';
const SocketIO = () => {
    
    const validPathname = ['contacts', 'persons'];

    useSocket(validPathname);

    return (
        <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/:id" element={<Chat />} />
            <Route path="/persons" element={<Persons />} />
        </Routes>
    )
}

export default SocketIO;