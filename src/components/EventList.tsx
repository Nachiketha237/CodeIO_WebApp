import React from 'react';
import EventCard from '@/components/EventCard'; 
import styles from './styles/Eventlist.module.css'; 
import Event from '@/Interfaces/EventInterface'; 

interface EventListProps {
  eventdata: Event[];
}

const EventList: React.FC<EventListProps> = ({ eventdata }) => {
  return (
    <div className={styles.base}>
      <p className={styles.title}>Events</p>
      <div className={styles.gridContainer}>
        {eventdata.map(event => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
