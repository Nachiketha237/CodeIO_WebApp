import React from 'react';
import { useLocation } from 'react-router-dom';
import Event from './EventInterface';
import styles from './Styles/Eventpage.module.css';

const EventPage: React.FC = () => {
  const location = useLocation();
  const { event } = location.state as { event: Event };

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
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
