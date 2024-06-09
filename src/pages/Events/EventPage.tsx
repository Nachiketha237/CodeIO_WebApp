import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, Image, Text, VStack, Button, Flex } from '@chakra-ui/react';
import Event from '../../Interfaces/EventInterface';
import themes from '@/utils/themes'; // Adjust the path as per your project structure

const EventPage: React.FC = () => {
  const location = useLocation();
  const { event } = location.state as { event: Event };
  const navigate = useNavigate();

  // Access specific shades from primary color in themes
  const { primary,secondary} = themes.colors;

  const handleClick = () => {
    navigate(`/events/${event.event_id}/register`, { state: { event } });
  };

  return (
    <Box p={8} backgroundColor={primary['0']} minHeight="100vh" display="flex" flexDirection="column" alignItems="center">
      <Box width="100%" display="flex" flexDirection={{ base: 'column', md: 'row' }} justifyContent="flex-start" mt={10}>
        <Box flexShrink={0}>
          <Image
            borderRadius="lg"
            width={{ base: '100%', md: 200 }}
            height={200}
            src={event.event_poster}
            alt="Event Poster"
            boxShadow="lg"
          />
        </Box>
        <Box ml={{ md: 6 }} mt={{ base: 4, md: 0 }}>
          <Heading fontSize="3xl">{event.event_name}</Heading>
          <Text fontSize="1.5rem" mt={2}>{event.tag_line}</Text>
        </Box>
      </Box>

      <Box mt={10} p={6} width="100%" maxWidth="1200px" borderRadius="lg" boxShadow="lg" backgroundColor={primary['500']}>
        <VStack align="start" spacing={4}>
          <Box
            p={4}
            borderRadius="md"
            fontSize="1.25rem"
            fontWeight="bold"
            overflow="hidden"
            maxHeight="250px"
            width="100%" // Ensure the box stretches to full width
          >
            {event.event_description}
          </Box>
          <Box width="100%" m={8}> {/* Ensure all text boxes stretch to full width */}
            <Text fontWeight="bold">Date: {event.event_date}</Text>
            <Text fontWeight="bold">Time: {event.event_time}</Text>
            <Text fontWeight="bold">Venue: {event.venue}</Text>
          </Box>
          <Flex width="100%" justifyContent="center">
          <Button
							mt={4}
							h="50px"
							w="150px"
							fontSize="13px"
							colorScheme="blue"
							variant="outline"
							_hover={{ bg: secondary['0'], color: "blue" }}
							onClick={handleClick}
						>
							Register
						</Button>
            </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default EventPage;
