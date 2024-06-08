
import { ChangeEvent, useState } from "react";
import { Box, Flex, Button, Input } from "@chakra-ui/react";
import { useAuth } from "@/context/authProvider";
import Event from "@/Interfaces/EventInterface";
import { Link, useNavigate  } from "react-router-dom";
import supabase from "@/config/supabaseClient";
import { useEffect } from "react";

export default function NewEvent() {
	const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [eventCount, setEventCount] = useState<number>(-1);
	const [eventData, setEventData] = useState<Event>({
		event_name: "",
		tag_line: "",
		event_description: "",
		event_poster: "",
		event_date: "",
		event_time: "",
		venue: ""
	});
	
    useEffect(() => {
        fetchEventCount();
      }, []);
    
      const fetchEventCount = async () => {
        const { count, error } = await supabase.supabase
          .from('Events')
          .select('*', { count: 'exact' });
    
        if (error) {
          console.error("Error fetching event count:", error);
        } else if (count !== null && count>=0) {
          setEventCount(count);
            setEventData((prevEventData) => ({
                ...prevEventData,
                event_id: count + 1
            }));
        }
      };

	const handleChange = (e: ChangeEvent<HTMLInputElement>, inputContent: string) => {
		const { value } = e.target;
		setEventData((prevEventData) => ({
			...prevEventData,
			[inputContent]: value,
		}));
	};


	const handleSubmit = async () => {
		const { data, error } = await supabase.supabase
			.from('Events')
			.insert([eventData]);

		if (error) {
			console.error("Error updating event data:", error);
		} else {
			console.log("Event data updated successfully:", data);
			setEventData(eventData);
			navigate('/admin');
		}
	};

	

	if (!isLoggedIn) {
		return (
			<div>
				Please log in to access the admin page. <Link to="/login">Go to Login</Link>
			</div>
		);
	}

	return (
		<Box p={4}>
					<Box mb={3}>
						<Flex margin={5}/>
						<label htmlFor="event_name">Event Name</label>
						<Input
							id="event_name"
							fontSize="14px"
							value={eventData.event_name}
							onChange={(e) => handleChange(e, "event_name")}
							placeholder="Enter title"
							border="0.5px solid grey"
							type="text"
							required
							width={"40%"}
							ml={4}
						/>
					</Box>
					<Box mb={3}>
						<label htmlFor="tag_line">Tag Line</label>
						<Input
							id="tag_line"
							fontSize="14px"
							value={eventData.tag_line}
							onChange={(e) => handleChange(e, "tag_line")}
							placeholder="Enter tagline"
							border="0.5px solid grey"
							type="text"
							defaultValue=""
							width={"50%"}
							ml={4}
						/>
					</Box>
					<Box mb={3}>
						<label htmlFor="event_description">Event Description</label>
						<Input
							id="event_description"
							value={eventData.event_description}
							fontSize="14px"
							onChange={(e) => handleChange(e, "event_description")}
							placeholder="Enter description"
							border="0.5px solid grey"
							type="text"
							
							overflowWrap={"normal"}
							flexWrap={"wrap"}
							textOverflow={"ellipsis"}
							defaultValue=""
							width={"80%"}
							ml={4}
						/>
					</Box>
					<Box mb={3}>
						<label htmlFor="event_poster">Event Poster</label>
						<Input
							id="event_poster"
							fontSize="14px"
							value={eventData.event_poster}
							onChange={(e) => handleChange(e, "event_poster")}
							placeholder="Enter poster link"
							border="0.5px solid grey"
							type="text"
							width={"80%"}
							ml={4}
							required
						/>
					</Box>
					
					<Box mb={3}>
						<label htmlFor="event_date">Event Date</label>
						<Input
							id="event_date"
							fontSize="14px"
							value={eventData.event_date}
							onChange={(e) => handleChange(e, "event_date")}
							placeholder="Enter date"
							border="0.5px solid grey"
							type="date"
							width={"40%"}
							ml={4}
							required
						/>
					</Box>
					<Box mb={3}>
						<label htmlFor="event_time">Event Time</label>
						<Input
							id="event_time"
							fontSize="14px"
							value={eventData.event_time}
							onChange={(e) => handleChange(e, "event_time")}
							placeholder="Enter time"
							border="0.5px solid grey"
							type="time"
							width={"40%"}
							ml={4}
							required
						/>
					</Box>
					<Box mb={3}>
						<label htmlFor="venue">Venue</label>
						<Input
							id="venue"
							fontSize="14px"
							value={eventData.venue}
							onChange={(e) => handleChange(e, "venue")}
							placeholder="Enter venue"
							border="0.5px solid grey"
							type="text"
							width={"50%"}
							ml={4}
							defaultValue=""
						/>
					</Box>
					
					<Button mt={4} size="sm" fontSize="13px" onClick={handleSubmit}>
						Submit
					</Button>
				</Box>

		
	);
}
