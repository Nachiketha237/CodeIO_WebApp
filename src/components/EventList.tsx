// import React from 'react';
// import EventCard from '@/components/EventCard'; 
// import styles from './styles/Eventlist.module.css'; 
// import Event from '@/Interfaces/EventInterface'; 

// interface EventListProps {
//   eventdata: Event[];
// }

// const EventList: React.FC<EventListProps> = ({ eventdata }) => {
//   return (
//     <div className={styles.base}>
//       <p className={styles.title}>Events</p>
//       <div className={styles.gridContainer}>
//         {eventdata.map(event => (
//           <EventCard key={event.event_id} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventList;
import React from 'react';
import Event from '@/Interfaces/EventInterface'; // Correct import statement
import {Box, Flex, Text} from '@chakra-ui/react'
import EventCard from '@/components/EventCard';


interface EventListProps {
  eventdata: Event[];
}

const EventList: React.FC<EventListProps> = ({ eventdata }) => {
  return (
    <Flex justifyContent={'center'} gap={'1.5rem'} direction={'column'} alignItems={'center'}>
      <Text fontSize={'2rem'} color={'black'} fontWeight={600}>Events</Text>
      <Flex direction={'row'} justifyContent={'center'} flexWrap={'wrap'} gap={'1.5rem'}>
        {eventdata.map(event => (
          <EventCard  event={event} />
          ))}
        </Flex>
    </Flex>
  );
};

export default EventList;