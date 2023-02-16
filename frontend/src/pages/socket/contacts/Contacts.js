import styles from './Contacts.module.css';
import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/auth';
import Sidebar from "../../../components/Sidebar"
const Contacts = () => {

    const user = useSelector(state => state.user)
    const [unvalid, setUnvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const changeLocationToLogin = <Navigate replace={true} to={`/login`} />
    const {id: userIdUse} = user;

    const [authData, authErr] = useAuth(setUnvalid);

    useEffect(() => {

        const auth = async () => {

            //pobieranie czatów użytkownika

            try {
                if(userIdUse){
                    const showResponse = await axios.post('data/showAll', {
                        data: {
                            userId: userIdUse
                        }
                    })
                    setContacts(showResponse.data);
                    setLoading(true)
                }
            }
            catch (err) {
                console.log(err);
                return null;
            }
        }

        auth();

    }, [userIdUse])


    return (
        <div className={styles.theme}>
            <Sidebar selected="contacts"></Sidebar>
            {unvalid && changeLocationToLogin}
            <div className={styles.contacts}>
                { (contacts.length != 0 && loading ) ? (contacts.map(contact => {

                    if (!contact.message.message) {
                        return null;
                    }

                    return (
                        <Link key={contact.roomId} className={styles.links} to={`/contacts/${contact.roomId}`}>
                            <div className={styles.cloud}>

                                {contact.messages != 0 ?
                                    (
                                        <div className={styles.notification}>
                                            {contact.messages}
                                        </div>
                                    )
                                    : null
                                }

                                <div className={styles.profileContainer}>
                                    <img src={contact.users[0].profile}></img>
                                </div>
                                <div className={styles.cloudContainer}>
                                    <div className={styles.username}>{contact.users[0].username}</div>
                                    <div className={styles.message}>{contact.message.username}: {contact.message.message}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })) : null}
                 { (contacts.length == 0 && loading ) ? (<div className={styles.noChats}>No chats available</div>) : null}
            </div>
        </div>
    )
}

export default Contacts;