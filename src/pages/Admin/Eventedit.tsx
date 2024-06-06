import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
import { Box, Flex, Button, IconButton, Input, Text } from "@chakra-ui/react";
import { useAuth } from "@/context/authProvider";
import Event from "@/pages/Events/EventInterface";
import { Link, useLocation } from "react-router-dom";

export default function EventEdit() {
	const location = useLocation();
	const { event } = location.state as { event: Event };
	
	const [eventData, setEventData] = useState<Event>(event);
	const [tempeventData, setTempEventData] = useState<Event>(event);
	const [editOpen, setEditOpen] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>, inputContent: string) => {
		const { value } = e.target;
		setTempEventData((prevTempEventData) => ({
			...prevTempEventData,
			[inputContent]: value,
		}));
	};

	const handleClick = (clickType: string) => {
		if (clickType === "edit") {
			setEditOpen(true);
		} else if (clickType === "close") {
			setEditOpen(false);
		}
	};

	const handleSubmit = () => {
		setEventData(tempeventData);
		setEditOpen(false);
	};

	const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
			<div>
				Please log in to access the admin page. <Link to="/login">Go to Login</Link>
			</div>
		);
    }

	return (
		<Box p={4}>
			<Flex
				justify="flex-end"
				mb={5}
				pb={4}
				align="center"
				borderBottom="2px solid rgba(0, 0, 0, 0.1)"
			>
				<IconButton
					w="auto"
					bg="bg-tirtiary-400"
					color="grey"
					h="20px"
					onClick={() => handleClick("edit")}
					p={3}
					icon={<EditIcon />}
					aria-label=""
				></IconButton>
			</Flex>
			{editOpen && (
				<Box ml={4} mt={3} mb={10} w="full">
					<Flex
						justify="space-between"
						borderRadius="10px"
						my={3}
						align="center"
					>
						<Text fontSize="18px" fontWeight={500}>
							Edit
						</Text>
						<IconButton
							size="sm"
							color="grey"
							bg="bg-tirtiary-400"
							p={0}
							onClick={() => handleClick("close")}
							icon={<CloseIcon />}
							_hover={{}}
							_focus={{ background: "white" }}
							aria-label=""
						></IconButton>
					</Flex>
					<Box mb={3}>
						<Flex margin={5}/>
						<label htmlFor="event_name">Event Name</label>
						<Input
							id="event_name"
							fontSize="14px"
							value={tempeventData.event_name}
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
							value={tempeventData.tag_line}
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
							value={tempeventData.event_description}
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
							value={tempeventData.event_poster}
							onChange={(e) => handleChange(e, "event_date")}
							placeholder="Enter date"
							border="0.5px solid grey"
							type="link"
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
							value={tempeventData.event_date}
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
							value={tempeventData.event_time}
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
							value={tempeventData.venue}
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
			)}
			{!editOpen && (
				<div>
					
					<Text fontSize="20px" mb={3} fontWeight={500}>
						 {eventData.event_name}
					</Text>
					<Text fontSize="17px" mb={2}>
						 {eventData.tag_line}
					</Text>
					<Text fontSize="15px" mb={2} fontWeight={500}>
						 {eventData.event_description}
					</Text>
					<Text fontSize="14px" mb={2}>
						Event Date: {eventData.event_date}
					</Text>
					<Text fontSize="14px" mb={2}>
						Event Time: {eventData.event_time}
					</Text>
					<Text fontSize="14px" mb={2}>
						Venue: {eventData.venue}
					</Text>
					
				</div>
			)}
		</Box>
	);
}
