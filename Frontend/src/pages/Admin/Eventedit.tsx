import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
import { Box, Flex, Image, Button, IconButton, Input, Text, FormControl, Heading, FormLabel, Textarea } from "@chakra-ui/react";
import { useAuth } from "@/context/authProvider";
import Event from "@/Interfaces/EventInterface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "@/config/supabaseClient";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { errorToast, successToast } from "@/utils/toast";
import axiosInstance from "@/axiosInstance";



export default function EventEdit() {
	const location = useLocation();
	const navigate = useNavigate();
	const { event } = location.state as { event: Event };

	const [eventData, setEventData] = useState<Event>(event);
	const [tempeventData, setTempEventData] = useState<Event>(event);
	const [editOpen, setEditOpen] = useState(false);

	const [file, setFile] = useState<File | ''>('');
	const [fName, setFName] = useState('');
	const [fileUrl, setFileUrl] = useState<string | ''>('');
	const [emailContent, setEmailContent] = useState<string>('');
	const [attachment, setAttachment] = useState<File | null>(null);

	// const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const files = e.target.files;
	// 	if (files && files.length > 0) {
	// 		setAttachment(files[0]);
	// 	}
	// };


	const handleChange = (e: ChangeEvent<HTMLInputElement>, inputContent: string) => {
		const { value } = e.target;
		setTempEventData((prevTempEventData) => ({
			...prevTempEventData,
			[inputContent]: value,
		}));
		console.log(tempeventData);
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
		try {
			const { data: r_data, error: r_error } = await supabase.supabase
				.from('Registrations')
				.select('usn, user_name, email, phone')
				.eq('event_id', event.event_id);

			if (r_error) {
				throw new Error(`Error fetching data from Supabase: ${r_error.message}`);
			}

			if (r_data !== null && r_data.length > 0) {
				const workbook = XLSX.utils.book_new();
				const worksheet = XLSX.utils.json_to_sheet(r_data);
				XLSX.utils.book_append_sheet(workbook, worksheet, `${event.event_name} Registrations`);
				const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
				const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
				saveAs(blob, 'query_result.xlsx');
			} else {
				errorToast('No registrations found for event_id:');
				console.log('No data found for event_id:', event.event_id);
			}
		} catch (error) {
			console.error('Error exporting to Excel:', error);
		}
	};




	const handleSubmit = async () => {
		setEditOpen(false);

		if (!file) return;
		const fileExt = file.name.split('.').pop();
		const fileName = `${eventData.event_id}.${fileExt}`;
		const filePath = `Events/Event_posters/${fileName}`;

		try {
			// Upload file to storage
			// const { data: existingFile, error: getError } = await supabase.supabase.storage
			//     .from('CodeIO')
			//     .list(`Events/Event_posters/${fileName}`);
			// console.log("Existing file:", existingFile);
			// console.log("Error:", getError);

			// if (getError!==null) {
			//     console.log("Error checking existing file:", getError);
			// } else if (existingFile){
			//     // Delete the existing file
			// 	console.log("Deleting existing file:", existingFile);

			//     const { error: deleteError } = await supabase.supabase.storage
			//         .from('CodeIO')
			//         .remove([filePath]);

			//     if (deleteError) {
			//         console.log("Error deleting existing file:", deleteError);
			//     }
			// 	else {
			// 		console.log("Existing file deleted successfully");
			// 	}
			// }

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

			const tempObj: Event = tempeventData
			tempObj.event_poster = url.publicUrl

			successToast("Image uploaded successfully");
			console.log("File URL:", tempeventData.event_poster);
			const { data, error } = await supabase.supabase
				.from('Events')
				.update(tempObj)
				.eq('event_id', event.event_id);

			if (error) {
				console.error("Error updating event data:", error);
				errorToast("Error updating event data");
			}
			else {
				console.log("Event data updated successfully:", data);
				successToast("Event data updated successfully");


			}
			navigate('/admin');
		} catch (error) {
			console.error('Error handling submit:', error);
			errorToast("Error handling submit");
		}
	};

	const sendEmail = async (emailContent: string, users: any[]) => {
		const obj: any = {
			content: emailContent,
			attachment,
			recipients: users // Assuming you want to send email to all users
		};

		const response = await axiosInstance.post('/adminMail', obj);

		if (response.status === 200) {
			successToast("Email sent successfully");
		}
		else {
			errorToast("Failed to send email");
			console.error('Error sending email:', response);
		}
		setEmailContent('');
		setAttachment(null);

	};

	const handleSendEmail = async () => {
		try {
			// const formData = new FormData();
			// formData.append('content', emailContent);
			// if (attachment) {
			// 	formData.append('attachment', attachment);
			// }

			const { data: users, error } = await supabase.supabase
				.from('Registrations')
				.select('email, user_name')
				.eq('event_id', event.event_id);

			if (error) {
				console.error('Error fetching users:', error);
			} else {
				console.log('Users:', users);
				// Implement email sending logic here using formData
				console.log('Sending email with content:', emailContent);
				console.log('Attachment:', attachment);
				await sendEmail(emailContent, users);

			}



		} catch (error) {
			console.error('Error sending email:', error);
			// Handle error in email sending
			errorToast('Failed to send email. Please try again later.');
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

			{editOpen && (
				<Box
					ml={4}
					mt={3}
					mb={10}
					w="95%" // Adjusted width to match your design
					mx="auto" // Center align the box horizontally
					bg="#f0f4f7"
					p={4}
					borderRadius="8px"
					boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
				>
					<Flex justify="space-between" align="center" mb={4} borderBottom="2px solid rgba(0, 0, 0, 0.1)">
						<Text fontSize="24px" fontWeight="bold">
							Edit Event
						</Text>

						<IconButton
							size="sm"
							color="gray.600"
							bg="gray.100"
							p={4}
							onClick={() => handleClick("close")}
							icon={<CloseIcon />}
							_hover={{ bg: "gray.100", color: "gray.800" }}
							aria-label="Close"
						/>
					</Flex>

					<form onSubmit={handleSubmit} style={{ width: "100%" }}>
						<FormControl mb={3}>
							<FormLabel htmlFor="event_name">Event Name</FormLabel>
							<Input
								id="event_name"
								fontSize="14px"
								value={tempeventData.event_name}
								onChange={(e) => handleChange(e, "event_name")}
								placeholder="Enter title"
								borderColor="gray.400"
								type="text"
								width={"30%"} // Full width input
								autoFocus
								required
							/>
						</FormControl>

						<FormControl mb={3}>
							<FormLabel htmlFor="tag_line">Tag Line</FormLabel>
							<Input
								id="tag_line"
								fontSize="14px"
								value={tempeventData.tag_line}
								onChange={(e) => handleChange(e, "tag_line")}
								placeholder="Enter tagline"
								borderColor="gray.400"
								type="text"
								width={"50%"} // Full width input
							/>
						</FormControl>

						<FormControl mb={3}>
							<FormLabel htmlFor="event_description">Event Description</FormLabel>
							<Textarea>
								<Input
									id="event_description"
									value={tempeventData.event_description}
									fontSize="14px"
									onChange={(e) => handleChange(e, "event_description")}
									placeholder="Enter description"
									borderColor="gray.400"
									width={"100%"}
									height={"60"}// Full width textarea
									resize="vertical" />
							</Textarea>
						</FormControl>

						<FormControl mb={3}>
							<FormLabel htmlFor="event_poster">
								{tempeventData.event_poster ? (
									<Image
										src={tempeventData.event_poster}
										alt={tempeventData.event_name}
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
								<FormLabel htmlFor="event_date">Event Start Date</FormLabel>
								<Input
									id="event_start_date"
									fontSize="14px"
									value={tempeventData.event_start_date}
									onChange={(e) => handleChange(e, "event__start_date")}
									placeholder="Enter date"
									borderColor="gray.400"
									type="date"
									width={"60%"} // Full width input
									required
								/>
							</FormControl>
							<FormControl mb={3} mr={2} flex="1">
								<FormLabel htmlFor="event_end_date">Event End Date</FormLabel>
								<Input
									id="event_end_date"
									fontSize="14px"
									value={tempeventData.event_end_date}
									onChange={(e) => handleChange(e, "event_end_date")}
									placeholder="Enter date"
									borderColor="gray.400"
									type="date"
									width={"60%"} // Full width input
									required
								/>
							</FormControl>


							<FormControl mb={3} ml={2} flex="1">
								<FormLabel htmlFor="event_time">Event Time</FormLabel>
								<Input
									id="event_time"
									fontSize="14px"
									value={tempeventData.event_time}
									onChange={(e) => handleChange(e, "event_time")}
									placeholder="HH:MM AM/PM to HH:MM AM/PM"
									borderColor="gray.400"
									type="text"
									width={"60%"} // Full width input
									required
								/>
							</FormControl>
						</Flex>

						<FormControl mb={3}>
							<FormLabel htmlFor="venue">Venue</FormLabel>
							<Input
								id="venue"
								fontSize="14px"
								value={tempeventData.venue}
								onChange={(e) => handleChange(e, "venue")}
								placeholder="Enter venue"
								borderColor="gray.400"
								type="text"
								width={"50%"} // Full width input
							/>
						</FormControl>
						<FormControl mb={3}>
							<FormLabel htmlFor="event_poster">QR Code Link</FormLabel>
							<Input
								id="QR_Code"
								fontSize="14px"
								value={tempeventData.QR_Code}
								onChange={(e) => handleChange(e, "QR_Code")}
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

			)}
			{!editOpen && (
				<div
					style={{
						backgroundColor: "#EFF4FF",
						padding: "20px",
						borderRadius: "8px",
						boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
						width: "95%",// Optional: Adjust the width as per your layout
						margin: "3px auto", // Optional: Center align the card
					}}
				>

					<Flex
						justify="flex-end"
						align="center"
						mb={5}
						borderBottom="2px solid rgba(0, 0, 0, 0.1)"
					>

						<IconButton
							w="auto"
							bg="bg-tirtiary-400"
							color="blue.500"
							h="30px"
							onClick={() => handleClick("edit")}
							p={1}
							icon={<EditIcon />}
							aria-label=""
						/>

					</Flex>
					<Flex mb={5}>
						<Image
							src={eventData.event_poster}
							alt={eventData.event_name}
							width="140px"
							height="140px"
							objectFit="cover"
							borderRadius="3px"
							boxShadow="5px 5px 8px rgba(0, 0, 0, 0.4)"
							mr={4} />
						<Text fontSize="24px" mb={4} fontWeight="bold" color="#333">
							{eventData.event_name}
							<Text fontSize="18px" mb={2} fontWeight="medium" color="#666">
								{eventData.tag_line}
							</Text>
							<Button
								mt={4}
								h="50px"
								w="150px"
								fontSize="13px"
								colorScheme="blue"
								variant="outline"
								_hover={{ bg: "blue.500", color: "white" }}
								onClick={handleQuery}
							>
								Export Registrations
							</Button>
						</Text>


						{/* <Image
				  src={eventData.QR_Code}
				  alt={eventData.event_name}
				  width="140px"
				  height="140px"
				  objectFit="cover"
				  borderRadius="3px"
				  boxShadow="5px 5px 8px rgba(0, 0, 0, 0.4)"
				  
				  mr={4}/> */}

					</Flex>


					<Text fontSize="16px" mb={3} color="#444">
						{eventData.event_description}
					</Text>
					<Text fontSize="14px" mb={2} color="#555">
						Event Date: {eventData.event_start_date} {eventData.event_end_date !== '' && `to ${eventData.event_end_date}`}
					</Text>

					<Text fontSize="14px" mb={2} color="#555">
						Event Time: {eventData.event_time}
					</Text>
					<Text fontSize="14px" mb={2} color="#555">
						Venue: {eventData.venue}
					</Text>



					<Flex justify="space-between" align="center">

						<Button
							mt={4}
							size="sm"
							fontSize="14px"
							colorScheme="red"
							variant="outline"
							_hover={{ bg: "red.500", color: "white" }}
							onClick={handleDelete}
						>
							Delete Event
						</Button>
					</Flex>
					<Box mt={10}>
						<Heading as="h2" size="lg" mb={4}>
							Send  Emails
						</Heading>
						<Textarea
							placeholder="Email content"
							value={emailContent}
							onChange={(e) => setEmailContent(e.target.value)}
							mb={3}
						/>
						{/* <FormControl mb={3} width="100%" display="flex" alignItems={"center"}>
							<FormLabel htmlFor="attachment">Attachment</FormLabel>
							<Box flex="1">
								<Input
									id="attachment"
									type="file"
									onChange={(e) => handleAttachmentChange(e)}
									borderColor="gray.400"
									width={"30%"}

								/>
							</Box>
						</FormControl> */}
						<Button colorScheme="teal" onClick={handleSendEmail}>
							Send Email
						</Button>
					</Box>

				</div>

			)}

		</Box>
	);
}
