import React, { useEffect, useState } from 'react';
import styles from './Styles/Events.module.css';
import EventList from '@/components/EventList';
import supabase from '../../config/supabaseClient'; // Import your Supabase client
import Event from '../../Interfaces/EventInterface'; // Correct import statement
import Loading from '../Loading';

const Events: React.FC = () => {
  const [eventdata, setEventdata] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.supabase.from('Events').select('*').filter('event_type', 'eq', 'Upcoming').order('event_start_date', { ascending: true });
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
    return <Loading isLoading/>
  }

  return (
    <div className={styles.events}>
      {eventdata.length !== 0 ? (
        <EventList eventdata={eventdata} />
      ) : (
        <div>No events available</div>
      )}
    </div>
  );
};

export default Events;
