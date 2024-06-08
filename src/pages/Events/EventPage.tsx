import React from 'react';
import { useLocation } from 'react-router-dom';
import Event from '../../Interfaces/EventInterface';
import styles from './Styles/Eventpage.module.css';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const EventPage: React.FC = () => {
  const location = useLocation();
  const { event } = location.state as { event: Event };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/events/${event.event_id}/register`, { state: {event} });
  };

  return (
    <div className={styles.base}>
      <div className={styles.container_for_event_headings}>
        <div className={styles.event_card}>
          <img className={styles.eventImg} src={event.event_poster} alt="Event Poster" />
        </div>
        <div className={styles.event_text_header}>
          <h2>{event.event_name}</h2>
          <h3 className={styles.tag}>{event.tag_line}</h3>
        </div>
      </div>

      <div className={styles.background_cards}>
        <div className={styles.card1}>
          <pre className={styles.longInfo1}>{event.event_description}</pre>
          <p>
            <span className="font-semibold">Date:</span> {event.event_date}<br />
            <span className="font-semibold">Time:</span> {event.event_time}<br />
            <span className="font-semibold">Venue:</span> {event.venue}<br />
            <Button mt={4} size="sm" fontSize="13px" disabled onClick={handleClick}>
                  Register
              </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
