import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Text } from '@chakra-ui/react';
import { useAuth } from '@/context/authProvider';
import Event from '@/Interfaces/EventInterface';

interface CardProps {
  event: Event;
}

const Card: React.FC<CardProps> = ({ event }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleClick = () => {
    if (!isLoggedIn)
      navigate(`/events/${event.event_id}`, { state: { event } });
    else
      navigate(`/admin/events/${event.event_id}`, { state: { event } });
  };

  return (
    <Box
      className="card"
      w="56"
      h="64"
      bg="primary.400"
      borderRadius="xl"
      boxShadow="2xl"
      overflow={"hidden"}
      p="6"
      onClick={handleClick}
      cursor="pointer"
    >
      <Box className="image" justifyContent="center" alignItems="center" objectFit="cover" h="28" w="full" mb="3">
        <Image src={event.event_poster} alt="event" />
      </Box>
      <Text className="card-title" fontSize="2xl" fontWeight="bold">
        {event.event_name}
      </Text>
      <Text className="card-content" fontSize="base" color="gray.700" lineHeight="6">
        {event.tag_line}
      </Text>
      <Text className="card-footer">
        {event.event_start_date} {event.event_end_date !== '' && `to ${event.event_end_date}`}
      </Text>
    </Box>
  );
};

export default Card;
