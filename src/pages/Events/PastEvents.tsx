import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';
import primary from '../../utils/themes';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react';
import Event from '../../Interfaces/EventInterface';
import Loading from '../Loading';
import YearSelector from '../../components/YearSelector';



const PastEvents: React.FC = () => {
  const [eventdata, setEventdata] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.supabase.from('Events').select('*').filter('event_type', 'eq', 'Past').order('event_start_date', { ascending: false });
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
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const filteredEvents = selectedYear
    ? eventdata.filter(event => new Date(event.event_start_date).getFullYear() === selectedYear)
    : eventdata;

  if(loading)
    {
      return <Loading isLoading/>
    }
  return (
    <Box py={12} bg={primary['0']}>
      <Container maxW="container.lg">
        <Heading as="h2" size="xl" mb={8}>
          Past Activities
        </Heading>
        
        <VStack spacing={8}>
        <YearSelector onSelectYear={handleYearChange} eventdata={eventdata}/>
          {filteredEvents.map((event) => (
            <Box key={event.event_id} p={8} bg={primary['500']} boxShadow="md" borderRadius="lg">
              <VStack spacing={4} align="start">
                {/* <Image src={event.event_poster} alt={`${event.event_name} Poster`} borderRadius="md" /> */}
                <Heading as="h3" size="lg">
                  {event.event_name}
                </Heading>
                <Text fontSize="md" color="gray.600">
                  {event.tag_line}
                </Text>
                <Text>
                  <strong>Date:</strong> {event.event_start_date} {event.event_end_date !== '' && `to ${event.event_end_date}`}
                </Text>
                <Text>
                  <strong>Time:</strong> {event.event_time}
                </Text>
                <Text>
                  <strong>Venue:</strong> {event.venue}
                </Text>
                <Text>
                  <strong>Price:</strong> {event.event_price}
                </Text>
                <Text>{event.event_description}</Text>
                {/* <Image src={event.QR_Code} alt={`${event.event_name} QR Code`} borderRadius="md" boxSize="150px" /> */}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};



export default PastEvents;
