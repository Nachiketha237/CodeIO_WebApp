import { Box, Heading } from '@chakra-ui/react';
import { useAuth } from '../../context/authProvider';
import { Link, Outlet } from 'react-router-dom';
import ManageEvents from './ManageEvents';



const Admin: React.FC = () => {
  const { isLoggedIn} = useAuth();
  
  


  if (!isLoggedIn) {
    return (
      <div>
        Please log in to access the admin page. <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <Box py={10} px={6}>
      <Heading as="h1" size="xl" mb={6}>
        Admin Dashboard
      </Heading>
      {/* <Flex>
        <Box w="100%">
          <Tabs>
            <TabList borderBottom="2px solid rgba(0, 0, 0, 0.1)">
              <Tab fontSize="lg" p={3}>
                Manage Events
              </Tab>
              <Tab fontSize="lg" p={3}>
                New Event
              </Tab>
              <Tab fontSize="lg" p={3}>
                Query Tool
              </Tab>
              <Tab fontSize="lg" p={3} onClick={handleLogout}>
                Logout
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="3px"
              bgGradient="linear(to-r, teal.400, blue.400)"
              borderRadius="1px"
            />
            <TabPanels border="2px solid rgba(0, 0, 0, 0.1)">
              <TabPanel>
                <ManageEvents />
              </TabPanel>
              <TabPanel>
                <NewEvent />
              </TabPanel>
              <TabPanel>
                <QueryTool />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Box mt={10}>
        <Heading as="h2" size="lg" mb={4}>
          Send Reminder Emails
        </Heading>
        <Textarea
          placeholder="Email content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          mb={3}
        />
        <Button colorScheme="teal" onClick={handleSendEmail}>
          Send Email
        </Button>
      </Box> */}
      <ManageEvents />
      <Outlet/>
    </Box>
  );
};

export default Admin;
