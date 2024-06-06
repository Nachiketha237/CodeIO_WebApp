import React, { useEffect, useState } from 'react';
import styles from './Styles/Events.module.css';
import EventList from '@/components/EventList';
import supabase from '../../config/supabaseClient'; // Import your Supabase client
import Event from './EventInterface'; // Correct import statement

const Events: React.FC = () => {
  const [eventdata, setEventdata] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.supabase.from('Events').select('*');
    console.log(data)
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEventdata(data);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.events}>
      <EventList eventdata={eventdata} />
    </div>
  );
};

export default Events;
