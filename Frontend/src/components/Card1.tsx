import React from 'react';
import styles from './styles/Card1.module.css';
import  Event  from '@/Interfaces/EventInterface';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authProvider';

interface CardProps {
   event: Event;
}

const Card1: React.FC<CardProps> = ({ event }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const handleClick = () => {
      if(!isLoggedIn)
        navigate(`/events/${event.event_id}`, { state: { event } });
      else 
        navigate(`/admin/events/${event.event_id}`, { state: { event } });
    };
    return (
    
   
        <div className={styles.ok} onClick={handleClick}>
            <div className={styles.container}>
                <div className={styles.cards}>
                    <div className={`${styles.face} ${styles.face1}`}>
                        <div className={styles.content}>
                            <img src={event.event_poster} alt="event" />
                        </div>
                    </div>
                    <div className={`${styles.face} ${styles.face2}`}>
                        <pre >{event.event_name}</pre>
                        <p >{event.tag_line}</p>
                        <Link to={`/events/${event.event_id}`}>Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card1;
