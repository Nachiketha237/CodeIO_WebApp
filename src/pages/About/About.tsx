import React from 'react';
import { Box, Heading, Text, List, ListItem, ChakraProvider } from '@chakra-ui/react';
import themes from '../../utils/themes'; // Adjust the path to your themes file

const About: React.FC = () => {
  return (
    <ChakraProvider theme={themes}>
      <Box p={8} minHeight="100vh" backgroundColor="primary.50" display="flex" flexDirection="column" alignItems="center">
        <Box maxWidth="800px" width="100%">
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} textAlign="center" mb={6} >
            About &lt;CodeIO/&gt;
          </Heading>
          <Text fontSize="lg" textAlign="left" mb={8} >
            &lt;CodeIO/&gt; is a technical community and club within the department of Computer Science and Engineering, B.M.S. College. The vision is to promote exploration and development of technical skills to gain real-life applications. The mission is to promote excellence in Computer Science education and overall Engineering knowledge.
          </Text>
          <Box>
            <Text fontSize="lg" textAlign="left" mb={4} >
              The development and work of &lt;CodeIO/&gt; encompasses three verticals:
            </Text>
            <List spacing={2} ml={6}>
              <ListItem >Facilitation of Hackathons, workshops and technology training sessions by the &lt;CodeIO/&gt; Research and Development (R&amp;D) wing.</ListItem>
              <ListItem >Hands-on Competitive Coding sessions, and preparation for Campus placement tests and interviews, by the &lt;CodeIO/&gt; Competitive Coding wing.</ListItem>
              <ListItem >Undertaking various web application developmental & department level projects within the institution like the Institutional Elective Portal and Placement Portal, by the &lt;CodeIO/&gt; Development wing.</ListItem>
            </List>
          </Box>
          <Box mt={8}>
            <Heading as="h2" fontSize="xl" mb={4} color="secondary.900">
              Objectives of &lt;CodeIO/&gt;
            </Heading>
            <List spacing={2} ml={6}>
              <ListItem >Imbibe the ability among students to work as individuals and in groups during projects.</ListItem>
              <ListItem >Contribute to open source projects, build websites and applications, provide technical support to organizations and various clubs on campus.</ListItem>
              <ListItem >Work as a team and contribute to department and college level projects and make the club a better community than ever before.</ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default About;
