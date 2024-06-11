import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, List, ListItem, ListIcon } from '@chakra-ui/react';
import Event from '@/Interfaces/EventInterface';
import supabase from '@/config/supabaseClient';
import Card1 from '@/components/Card1';
import Loading from '../Loading';
import primary from '@/utils/themes';

const Home: React.FC = () => {
  const [eventdata, setEventdata] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const events =eventdata.slice(0, 3);
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.supabase.from('Events').select('*').filter('event_type', 'eq', 'Upcoming').order('event_start_date', { ascending: true });
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEventdata(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  // Ensure we have at least 4 events to display
//   const displayedEvents = [...eventdata.slice(0, 4), ...eventdata.slice(0, 4), ...eventdata.slice(0, 4), ...eventdata.slice(0, 4)];

  return (
    <Box p={8} minHeight="100vh" backgroundColor={primary['500']} display="flex" flexDirection="column" alignItems="center">
      <Box maxWidth="1000px" width="100%">
        <Box textAlign="center" mt={10}>
          <Heading as="h1" fontSize="4xl" mb={4}>
            Welcome to &lt;CodeIO/&gt;!
          </Heading>
          <Text fontSize="xl" >
            The premier technical community and club of the Computer Science and Engineering department at B.M.S. College.
          </Text>
        </Box>

        <VStack spacing={8} mt={12} alignItems="start">
          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Our Vision
            </Heading>
            <Text fontSize="lg">
              To promote the exploration and development of technical skills, ensuring students can apply these skills in real-world scenarios.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Our Mission
            </Heading>
            <Text fontSize="lg">
              To cultivate an environment that promotes excellence in computer science education and engineering knowledge through various activities and projects.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              What We Do
            </Heading>
            <Text fontSize="lg" mb={3}>
              &lt;CodeIO/&gt; focuses on three main verticals:
            </Text>
            <Box ml={4}>
              <Heading as="h3" fontSize="xl" mb={2}>
                Research & Development (R&D)
              </Heading>
              <List spacing={2}>
                <ListItem>Facilitating hackathons, workshops, and technology training sessions.</ListItem>
                <ListItem>Encouraging innovative project ideas and supporting their development.</ListItem>
              </List>
              <Heading as="h3" fontSize="xl" mt={4} mb={2}>
                Competitive Coding
              </Heading>
              <List spacing={2}>
                <ListItem>Organizing hands-on coding sessions.</ListItem>
                <ListItem>Preparing students for campus placement tests and technical interviews.</ListItem>
              </List>
              <Heading as="h3" fontSize="xl" mt={4} mb={2}>
                Development Projects
              </Heading>
              <List spacing={2}>
                <ListItem>Undertaking web application development.</ListItem>
                <ListItem>Contributing to department-level projects like the Institutional Elective Portal and Placement Portal.</ListItem>
              </List>
            </Box>
          </Box>

          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Featured Events
            </Heading>
  
            <Box className="gridContainer" display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
              {events.map(event => (
                <Card1 key={event.event_id} event={event} />
              ))}
            </Box>
          </Box>

          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Objectives
            </Heading>
            <List spacing={2}>
              <ListItem>Foster teamwork and individual project management skills among students.</ListItem>
              <ListItem>Contribute to open-source projects, develop websites and applications, and provide technical support to campus organizations.</ListItem>
              <ListItem>Collaborate on department and college-level projects, enhancing the overall community.</ListItem>
            </List>
          </Box>

          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Join Us!
            </Heading>
            <Text fontSize="lg">
              Are you passionate about coding, development, and technology? Join &lt;CodeIO/&gt; and be a part of a vibrant community where you can learn, grow, and contribute. Together, we can make a difference and build a better tech-savvy community.
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
