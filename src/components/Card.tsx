import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Card.module.css';
import { useAuth } from '@/context/authProvider';
import Event from '@/Interfaces/EventInterface';


interface CardProps {
    event: Event;
  }
  
  const Card: React.FC<CardProps> = ({ event }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const handleClick = () => {
      if(!isLoggedIn)
        navigate(`/events/${event.event_id}`, { state: { event } });
      else 
        navigate(`/admin/events/${event.event_id}`, { state: { event } });
    };
  
    return (
      <div className={styles.card} onClick={handleClick}>
                       <div className={styles.image}>
                            <img src={event.event_poster} alt="event" />
                        </div>
        <div className={styles['card-title']}>{event.event_name}</div>
        
        <div className={styles['card-content']}>{event.tag_line}</div>
        <div className={styles['card-footer']}>{event.event_date}</div>
      </div>
    );
  };
  
  export default Card;
