import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Image,
} from '@chakra-ui/react';
import  primary  from '../../utils/themes';

const events = [
  {
    event_id: 3,
    event_name: "Phaseshift Event - Grid Game",
    tag_line: "An exciting tech-based board game challenge",
    event_description: `Organized by <CodeIO/> Club, the "Grid Game" activity was conducted by the Department of Computer Science & Engineering as part of Phaseshift - 2022. On 26th November 2022, from 12pm to 4:15pm, this event took place at CR-402 on the 4th floor of the Platinum Jubilee Block. Coordinated by Adarsh K N and Mahantesh Gattina, it featured the participation of 25 student teams, challenging their problem-solving skills through crossword puzzles, numerical decryption, and a tech-based board game.`,
    event_date: "26 November 2022",
    event_time: "12:00 PM - 4:15 PM",
    venue: "4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/grid-game-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/grid-game-qr-code.jpg"
  },
  {
    event_id: 4,
    event_name: "Session on Docker and Kubernetes",
    tag_line: "Hands-on introduction to containerization",
    event_description: `Organized a session on Docker and Kubernetes on 9th December 2022, from 11am to 1pm, at Auditorium 2. This informative session, conducted by alumni Harsh Shankar Rao and Karthik Venugopal, both Software Engineers at Akamai Technologies, aimed to introduce Docker and Kubernetes to 7th-semester students. As part of their cloud computing syllabus, the session covered topics such as Docker advantages, installation, project dockerization, Kubernetes architecture, and implementation. Approximately 100 to 150 participants engaged in this hands-on interactive session.`,
    event_date: "9 December 2022",
    event_time: "11:00 AM - 1:00 PM",
    venue: "Auditorium-2, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/docker-kubernetes-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/docker-kubernetes-qr-code.jpg"
  },
  {
    event_id: 5,
    event_name: "Introduction to ML Course",
    tag_line: "Fundamentals of Machine Learning",
    event_description: `Organized the "Introduction to Machine Learning Course," led by instructor Kiran M K, a final year UG CSE student and intern at IISc. This comprehensive course, held offline from 2nd to 14th January, provided participants with fundamental mathematical concepts and commonly used ML algorithms. The sessions took place on weekdays from 4pm to 5.30pm and on weekends from 2pm to 5pm. Approximately 50-60 participants actively engaged in interactive sessions.`,
    event_date: "2 January - 14 January 2023",
    event_time: "Weekdays: 4:00 PM - 5:30 PM, Weekends: 2:00 PM - 5:00 PM",
    venue: "Hybrid BSN Lab, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/ml-course-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/ml-course-qr-code.jpg"
  },
  {
    event_id: 6,
    event_name: `Value Added Course on “Deep Dive into Python for Data Analytics, IoT and Gaming”`,
    tag_line: "Comprehensive Python training",
    event_description: `The Department of Computer Science and Engineering, in collaboration with IEEE SB BMS and <CodeIO/>, organized a Value Added Course titled "Deep Dive into Python for Data Analytics, IoT, and Gaming" from 20th to 31st March 2023. The course was facilitated by Pooja Srinivasan from Twilio, focusing on Python concepts, industry perspectives, and practical applications. Participants gained hands-on experience with various libraries, emphasizing real-world usage.`,
    event_date: "20 March 2023 - 31 March 2023",
    event_time: "Weekdays: 4:00 PM - 6:00 PM",
    venue: "Hybrid Lab 2, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/python-course-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/python-course-qr-code.jpg"
  },
  {
    event_id: 7,
    event_name: "Object detection with Custom Dataset",
    tag_line: "Hands-on object detection workshop",
    event_description: `Organized a workshop on "Object Detection On Custom Dataset" within the Computer Science and Engineering Department on 12th April 2023, from 3:30 pm to 5:30 pm, at the BSN Lab. Dr. Umadevi V led this informative session, focusing on hands-on learning with topics such as classification, object detection, localization, and training the YOLO model using a provided dataset. 15 participants actively engaged in this interactive session.`,
    event_date: "12 April 2023",
    event_time: "3:30 PM - 5:30 PM",
    venue: "BSN Lab, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/object-detection-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/object-detection-qr-code.jpg"
  },
  {
    event_id: 8,
    event_name: "Session on Indian Patent Filing and Grant Process",
    tag_line: "Learn about Indian Patent processes",
    event_description: `Organized a "Session on Indian Patent Filing and Grant Process" within the Computer Science and Engineering Department on 17th May 2023, from 11:00 am to 1:00 pm, at the CSE Seminar Hall. The session was conducted by Dr. Rajeshwari B S and Namratha M. During the interactive session, they provided students with insights into the steps involved in Indian Patent filing, offering a detailed understanding of the process. 104 students participated in this informative session.`,
    event_date: "17 May 2023",
    event_time: "11:00 AM - 1:00 PM",
    venue: "CSE Seminar Hall, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/patent-filing-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/patent-filing-qr-code.jpg"
  },
  {
    event_id: 9,
    event_name: "UG Final Year Open House Project Poster Presentation and Demonstration",
    tag_line: "Showcase of final year projects",
    event_description: `The Department of Computer Science and Engineering, in collaboration with Protocol, hosted the UG Final Year Open House Project Poster Presentation and Demonstration on 10th June 2023. The event featured project evaluations by industry experts Jayananda Kotri and Sarthak Goyal, providing a platform for final year undergraduate students to showcase their projects and receive valuable feedback.`,
    event_date: "10 June 2023",
    event_time: "9:00 AM - 4:00 PM",
    venue: "CSE Seminar Hall, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/open-house-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/open-house-qr-code.jpg"
  },
  {
    event_id: 10,
    event_name: "One-week workshop on DevOps, Kubernetes, and Dockers",
    tag_line: "Intensive DevOps training",
    event_description: `A one-week workshop on "DevOps, Kubernetes, and Dockers" was conducted from 15th to 21st June 2023, led by Harsh Shankar Rao. This intensive workshop introduced DevOps as a course during the 4th semester and provided training to faculty on Full-stack Development and DevOps methodologies. Participants also gained hands-on experience with Kubernetes and Dockers.`,
    event_date: "15 June 2023 - 21 June 2023",
    event_time: "Weekdays: 4:00 PM - 6:00 PM",
    venue: "BSN Lab, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/devops-workshop-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/devops-workshop-qr-code.jpg"
  },
  {
    event_id: 11,
    event_name: "Project Work-4 Evaluation by Industry Experts",
    tag_line: "Industry evaluation of projects",
    event_description: `Project Work-4 was subjected to evaluation by a panel of industry experts on 16th and 17th June 2023. The evaluators included Ms. Reema from Test Yantra, Ms. Pooja from Nokia, and Mrs. Sunitha Srinivas. The event provided final-year students with the opportunity to present their work and receive feedback from experienced professionals.`,
    event_date: "16 June 2023 - 17 June 2023",
    event_time: "9:00 AM - 4:00 PM",
    venue: "BSN Lab, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/project-evaluation-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/project-evaluation-qr-code.jpg"
  },
  {
    event_id: 12,
    event_name: "Session on \"Technical Paper Writing\"",
    tag_line: "Learn how to write technical papers",
    event_description: `Organized a "Session on Technical Paper Writing" on 24th June 2023. Dr. Anitha K, from the Computer Science and Engineering Department, led this session, providing students with insights into technical paper writing. The event, held at the BSN lab, was attended by 18 students and featured interactive discussions on various aspects of technical writing.`,
    event_date: "24 June 2023",
    event_time: "10:00 AM - 12:00 PM",
    venue: "BSN Lab, 4th Floor, CSE Department, Platinum Jubilee Block, B.M.S College of Engineering",
    event_poster: "path/to/technical-paper-writing-poster.jpg",
    event_price: "Free",
    QR_Code: "path/to/technical-paper-writing-qr-code.jpg"
  }
];

const PastActivities = () => {
  return (
    <Box py={12} bg={primary['0']}>
      <Container maxW="container.lg">
        <Heading as="h2" size="xl" mb={8}>
          Past Activities
        </Heading>
        <VStack spacing={8}>
          {events.map((event) => (
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
                  <strong>Date:</strong> {event.event_date}
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

export default PastActivities;
