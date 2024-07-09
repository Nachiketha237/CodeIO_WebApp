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
  Image
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authProvider';
import supabase from '../../config/supabaseClient';
import Event from '../../Interfaces/EventInterface';
import { errorToast, successToast } from '@/utils/toast';

const NewEvent: React.FC = () => {
  const navigate = useNavigate();
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
  const [file, setFile] = useState<File | ''>('');
  const [fName, setFName] = useState('');
  const { isLoggedIn } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchEventCount();
  }, []);

  const fetchEventCount = async () => {
    const { data, error } = await supabase.supabase
      .from('Events')
      .select('event_id')
      .order('event_id', { ascending: false })
      .limit(1);

    console.log('Event count:', data);
    const count = data ? data[0].event_id : -1;
    console.log('Event count:', count);
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
    console.log('New Event:', newEvent);
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
        else {
          newEvent.event_type = 'Past';
        }
        if (!file) return;
        const fileExt = file.name.split('.').pop();
        const fileName = `${newEvent.event_id}.${fileExt}`;
        const filePath = `Events/Event_posters/${fileName}`;


        let { error: uploadError } = await supabase.supabase.storage
          .from('CodeIO')
          .upload(filePath, file,
            {
              upsert: true
            });

        if (uploadError) {
          console.log("Error uploading image:", uploadError);
          errorToast("Error uploading image");
          return;
        }

        // Retrieve public URL
        const { data: url } = await supabase.supabase.storage
          .from('CodeIO')
          .getPublicUrl(filePath);
        console.log("Public URL:", url.publicUrl);

        if (!url) {
          console.error("Public URL not available");
          errorToast("Public URL not available");
          return;
        }

        // Update tempeventData with the public URL

        const tempObj: Event = { ...newEvent };
        tempObj.event_poster = url.publicUrl

        successToast("Image uploaded successfully");


        const { data, error } = await supabase.supabase.from('Events').insert(tempObj);
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
          navigate('/admin')
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
          <FormLabel htmlFor="event_poster">
            {newEvent.event_poster ? (
              <Image
                src={newEvent.event_poster}
                alt={newEvent.event_name}
                width="140px"
                height="140px"
                objectFit="cover"
                borderRadius="3px"
                boxShadow="5px 5px 8px rgba(0, 0, 0, 0.4)"
                mr={4}
              />
            ) : (
              <Text fontSize="14px" color="red.500">
                Upload Poster
              </Text>
            )}
          </FormLabel>
          <Input
            id="event_poster"
            fontSize="14px"
            placeholder="Enter poster link"
            borderColor="gray.400"
            width="100%" // Full width input
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : '';
              setFile(file);
              setFName(e.target.files ? e.target.files[0].name : '');
              console.log(file);
            }}
          />

          {fName && (
            <Text mt={2} fontSize="14px" color="green.500">
              {`${fName}`}
            </Text>
          )}

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
