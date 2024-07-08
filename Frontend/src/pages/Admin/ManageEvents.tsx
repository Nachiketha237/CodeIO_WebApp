import React, { useState, useEffect } from 'react';
import { SimpleGrid} from '@chakra-ui/react';
import Event from '../../Interfaces/EventInterface';
import supabase from '../../config/supabaseClient';
import { useAuth } from '../../context/authProvider';
import { Link } from 'react-router-dom';
import Card from '../../components/EventCard';

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.supabase.from('Events').select('*');
      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const { error } = await supabase.supabase.from('Events').delete().eq('event_id', id);
      if (error) {
        console.error('Error deleting event:', error.message);
      } else {
        setEvents(events.filter(event => event.event_id !== id));
      }
    } catch (error) {
      console.log('Error deleting event:', error);
    }
  };
  if (!isLoggedIn) {
    return (
      <div>
        Please log in to access the admin page. <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <SimpleGrid columns={{ sm: 2, md: 4 }} spacing={4} mt={5}>
       {events.map(event => (
          <Card key={event.event_id} event={event} />
        ))}
    </SimpleGrid>
  );
};

export default ManageEvents;
