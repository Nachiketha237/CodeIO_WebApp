import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
import { Box, Flex, Button, IconButton, Input, Text } from "@chakra-ui/react";
import { useAuth } from "@/context/authProvider";
import Event from "@/pages/Events/EventInterface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import  supabase  from "@/config/supabaseClient";



export default function EventEdit() {
	const location = useLocation();
	const navigate = useNavigate();
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
	const handleDelete = async () => {
		const { data, error } = await supabase.supabase
			.from('Events') // Replace 'events' with your table name
			.delete()
			.eq('event_id', event.event_id); // Assumes you have an 'event_id' field to identify the event

		if (error) {
			console.error("Error deleting event data:", error);
		} else {
			navigate('/admin');
			console.log("Event data deleted successfully:", data);
			
		}
	};
	const handleQuery = async () => {
		const { data: r_data, error: r_error } = await supabase.supabase
			.from('Registrations')
			.select('usn, user_name, email, phone')
			.eq('event_id', event.event_id)
		if(r_error){
			console.error("Error fetching registration data:", r_error);
		}
		else{
			console.log("Registration data fetched successfully:", r_data);
		}
	};
	// const fs = require('fs');
	// const ExcelJS = require('exceljs');

	// const handleQuery = async () => {
	// 	try {
	// 		const { data: r_data, error: r_error } = await supabase.supabase
	// 			.from('registrations')
	// 			.select('usn, user_name, email, phone')
	// 			.eq('event_id', event.event_id);
	// 			 // Assuming single record retrieval

	// 		if (r_error) {
	// 			console.error("Error fetching registration data:", r_error);
	// 			return;
	// 		}

	// 		console.log("Registration data fetched successfully:", r_data);

	// 		// Create a new workbook
	// 		const workbook = new ExcelJS.Workbook();
	// 		const worksheet = workbook.addWorksheet('Registrations');

	// 		// Define headers for Excel file
	// 		worksheet.columns = [
	// 			{ header: 'USN', key: 'usn', width: 15 },
	// 			{ header: 'User Name', key: 'user_name', width: 30 },
	// 			{ header: 'Email', key: 'email', width: 30 },
	// 			{ header: 'Phone', key: 'phone', width: 15 }
	// 		];

	// 		// Add data rows
	// 		r_data.forEach(row => {
	// 			worksheet.addRow({
	// 				usn: row.usn,
	// 				user_name: row.user_name,
	// 				email: row.email,
	// 				phone: row.phone
	// 			});
	// 		});

	// 		// Generate Excel file in a buffer
	// 		const buffer = await workbook.xlsx.writeBuffer();

	// 		// Write buffer to a file
	// 		const fileName = `registrations_${Date.now()}.xlsx`; // Example file name
	// 		fs.writeFileSync(fileName, buffer);

	// 		console.log(`Excel file "${fileName}" has been generated successfully.`);
	// 	} catch (error) {
	// 		console.log("Error processing registrations:", error);
	// 	}
	// };

	// // Example usage
	

	

	const handleSubmit = async () => {
		setEventData(tempeventData);
		setEditOpen(false);
		const { data, error } = await supabase.supabase
			.from('Events') 
			.update(eventData)
			.eq('event_id', event.event_id); 

		if (error) {
			console.error("Error updating event data:", error);
		}
		else {
			console.log("Event data updated successfully:", data);
			
		}
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
						{/* <Button mt={4} size="sm" fontSize="13px" onClick={handleQuery}>
							registrations
						</Button> */}
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
					<Button mt={4} size="sm" fontSize="13px" onClick={handleDelete}>
						Delete
					</Button>
			
				</div>
				
			)}
			
		</Box>
	);
}
