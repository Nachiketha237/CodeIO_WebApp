import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authProvider';
import supabase from '../../config/supabaseClient';
import Event from '../../Interfaces/EventInterface';
import { errorToast, successToast } from '@/utils/toast';

const NewEvent: React.FC = () => {
  const [newEvent, setNewEvent] = useState<Event>({
    event_id: -1,
    event_name: '',
    event_poster: '',
    event_price: 0,
    tag_line: '',
    event_start_date: '',
    event_end_date: '',
    event_time: '',
    venue: '',
    event_description: '',
    QR_Code: '',
    event_type: 'Upcoming',
  });
  const [eventCount, setEventCount] = useState<number>(-1);

  const { isLoggedIn } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchEventCount();
  }, []);

  const fetchEventCount = async () => {
    const { count, error } = await supabase.supabase
      .from('Events')
      .select('event_id')
      .order('event_id', { ascending: false })
      .limit(1);


    if (error) {
      console.error("Error fetching event count:", error);
    } else if (count !== null && count >= 0) {
      setEventCount(count);
      setNewEvent((prevEventData) => ({
        ...prevEventData,
        event_id: count + 1
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        newEvent.event_id !== -1 &&
        newEvent.event_name !== '' &&
        newEvent.event_description !== '' &&
        newEvent.event_time !== '' &&
        newEvent.QR_Code !== '' &&
        newEvent.venue !== '' &&
        newEvent.event_start_date <= newEvent.event_end_date
      ) {
        if (newEvent.event_start_date < new Date().toISOString().split('T')[0]) {
          newEvent.event_type = 'Upcoming';
        }

        const { data, error } = await supabase.supabase.from('Events').insert([newEvent]);
        if (error) {
          console.error('Error adding event:', error.message);
          errorToast(`${newEvent.event_name}: Error adding event`);
        } else {
          console.log('Event added successfully:', data);
          successToast(`${newEvent.event_name}: Event added successfully`);
          setNewEvent({
            event_id: -1,
            event_name: '',
            event_poster: '',
            event_price: 0,
            tag_line: '',
            event_start_date: '',
            event_end_date: '',
            event_time: '',
            venue: '',
            event_description: '',
            QR_Code: '',
            event_type: 'Upcoming',
          });
        }
      }
    } catch (error) {
      console.error('Error adding event:', error);
      errorToast("Error adding event");
    } finally {
      // Clear the form or perform any cleanup here
    }
  };

  if (!isLoggedIn) {
    return (
      <Box>
        Please log in to access the admin page. <ChakraLink as={Link} to="/login">Go to Login</ChakraLink>
      </Box>
    );
  }

  return (
    <Box
      mx="auto"
      w="95%"
      bg="#EFF4FF"
      p={4}
      mt={10}
      borderRadius="8px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    >
      <Text fontSize="24px" fontWeight="bold">
        New Event
      </Text>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <FormControl mb={3}>
          <FormLabel htmlFor="event_name">Event Name</FormLabel>
          <Input
            id="event_name"
            fontSize="14px"
            name="event_name"
            value={newEvent.event_name}
            onChange={handleInputChange}
            placeholder="Enter title"
            borderColor="gray.400"
            type="text"
            width={"40%"} // Full width input
            autoFocus
            required
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel htmlFor="tag_line">Tag Line</FormLabel>
          <Input
            id="tag_line"
            fontSize="14px"
            name="tag_line"
            value={newEvent.tag_line}
            onChange={handleInputChange}
            placeholder="Enter tagline"
            borderColor="gray.400"
            type="text"
            width={"60%"} // Full width input
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel htmlFor="event_description">Event Description</FormLabel>
          <Textarea
            id="event_description"
            value={newEvent.event_description}
            fontSize="14px"
            name="event_description"
            onChange={handleInputChange}
            placeholder="Enter description"
            borderColor="gray.400"
            width={"100%"}
            resize="vertical"
            required
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel htmlFor="event_poster">Event Poster Link</FormLabel>
          <Input
            id="event_poster"
            fontSize="14px"
            name="event_poster"
            value={newEvent.event_poster}
            onChange={handleInputChange}
            placeholder="Enter poster link"
            borderColor="gray.400"
            type="url"
            width={"100%"} // Full width input
            required
          />
        </FormControl>

        <Flex justify="space-between">
          <FormControl mb={3} mr={2} flex="1">
            <FormLabel htmlFor="event_start_date">Event Start Date</FormLabel>
            <Input
              id="event_start_date"
              fontSize="14px"
              name="event_start_date"
              value={newEvent.event_start_date}
              onChange={handleInputChange}
              placeholder="Enter start date"
              borderColor="gray.400"
              type="date"
              width={"100%"} // Full width input
              required
            />
          </FormControl>
          <FormControl mb={3} mr={2} flex="1">
            <FormLabel htmlFor="event_end_date">Event End Date</FormLabel>
            <Input
              id="event_end_date"
              fontSize="14px"
              name="event_end_date"
              value={newEvent.event_end_date}
              onChange={handleInputChange}
              placeholder="Enter end date"
              borderColor="gray.400"
              type="date"
              width={"100%"} // Full width input
              required
            />
          </FormControl>

          <FormControl mb={3} ml={2} flex="1">
            <FormLabel htmlFor="event_time">Event Time</FormLabel>
            <Input
              id="event_time"
              fontSize="14px"
              name="event_time"
              value={newEvent.event_time}
              onChange={handleInputChange}
              placeholder="HH:MM AM/PM to HH:MM AM/PM"
              borderColor="gray.400"
              type="text"
              width={"100%"} // Full width input
              required
            />
          </FormControl>
        </Flex>

        <FormControl mb={3}>
          <FormLabel htmlFor="venue">Venue</FormLabel>
          <Input
            id="venue"
            fontSize="14px"
            name="venue"
            value={newEvent.venue}
            onChange={handleInputChange}
            placeholder="Enter venue"
            borderColor="gray.400"
            type="text"
            width={"100%"} // Full width input
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel htmlFor="QR_Code">QR Code Link</FormLabel>
          <Input
            id="QR_Code"
            fontSize="14px"
            name="QR_Code"
            value={newEvent.QR_Code}
            onChange={handleInputChange}
            placeholder="QR Code link"
            borderColor="gray.400"
            type="url"
            width={"100%"} // Full width input
            required
          />
        </FormControl>

        <Button mt={4} size="sm" fontSize="13px" type="submit" colorScheme="blue" >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default NewEvent;
