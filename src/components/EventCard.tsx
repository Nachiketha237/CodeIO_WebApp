import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card ,CardBody,Stack,CardFooter, Image, Text } from '@chakra-ui/react';
import { useAuth } from '@/context/authProvider';
import Event from '@/Interfaces/EventInterface';
import  themes  from '@/utils/themes';

interface CardProps {
  event: Event;
}

const EventCard: React.FC<CardProps> = ({ event }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleClick = () => {
    if (!isLoggedIn)
      navigate(`/events/${event.event_id}`, { state: { event } });
    else
      navigate(`/admin/events/${event.event_id}`, { state: { event } });
  };

  return (
    <Card onClick={handleClick} cursor="pointer" _hover={{ shadow: '2xl' }} width ="275px" height="auto" maxHeight={"400px"} backgroundColor={themes.colors.secondary['100']}>
    <Image src= {event.event_poster} alt="event" borderRadius="lg" h={"180px"} m={2}  objectFit={"cover"} />
    <CardBody>
      <Stack spacing={1}>
        <Text fontSize="lg" fontWeight="semibold">
          {event.event_name}
        </Text>
        {/* <Text>{event.tag_line}</Text> */}
      </Stack>
      <Text color="gray.500">{event.event_start_date} {event.event_end_date !== '' && `to ${event.event_end_date}`}</Text>
    </CardBody>
  </Card>

  );
};

export default EventCard;
