import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Box,
    Flex,
    Select,
    FormHelperText,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Center,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Event from "../../Interfaces/EventInterface";
import supabase from "@/config/supabaseClient";
import Registrations from '../../Interfaces/RegisterInterface';
import { errorToast,successToast } from '@/utils/toast';
import { TIMEOUT } from 'dns/promises';
import axiosInstance from '../../axiosInstance';

export default function Registration() {
    const [showQRCode, setShowQRCode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state as { event: Event };
    const [registerCount, setRegisterCount] = useState<number>(-1);
    const [eventRegisterCount, setEventRegisterCount] = useState<number>(0); 
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [registerData, setRegisterData] = useState<Registrations>({
        usn: "",
        user_name: "",
        email: "",
        phone: "",
        department: " ", // default department
        year: " ", // default year
        event_id: event.event_id,
        payment_status: true, // initial payment status
    });

    useEffect(() => {
        console.log(event)
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, inputContent: string) => {
        const { value } = e.target;
        setRegisterData((prevRegisterData) => ({
            ...prevRegisterData,
            [inputContent]: value,
        }));
    };

    const handlePayClick =  () => {
        
        // Perform other payment-related operations here if needed
        if(registerData.payment_status === true && registerData.user_name !== "" && registerData.email !== "" && registerData.phone !== "" && registerData.department !== "" && registerData.year !== "" && registerData.usn !== "" ) {
            setShowQRCode(true);
    }
        else{
            errorToast("Please fill all the details");
        }
    
    };
    const validate = async () => {
        const { data, error } = await supabase.supabase
            .from('Registrations')
            .select('usn')
            .filter('usn','eq',registerData.usn)
            .filter('event_id', 'eq', registerData.event_id);
    
        if (error) {
            console.error('Error fetching registration data:', error);
            return false;
        }
    

        if (data && data.length > 0) {
            // Registration already exists for this event
            return true;
        } else {
            // No registration found for this event
            return false;
        }
    };

    const sendEmail = async() => {
        const obj : any = {
            name: registerData.user_name,
            email: registerData.email, 
            workshopName : event.event_name, 
            date: event.event_start_date, 
            time: event.event_time, 
            venue: event.venue
        }
        const response = await axiosInstance.post('/mail', obj)
        console.log(response.status == 200 ? `Mail Sent` : `Mail Failed`)
    }

    const handleCloseQRCode = async () => {
        if (!(await validate())) {
            const { data, error } = await supabase.supabase
                .from('Registrations')
                .insert([registerData]);
    
            if (error) {
                console.error('Error inserting registration data:', error);
                errorToast("Registration Failed try again");
            } else {
                console.log('Registration data inserted successfully:', data);
                // Update state or perform any necessary action
               successToast("Registration successfull");
               if(registerData.email){
               sendEmail();
               }// navigate('/events');
            }
        } else {
            errorToast("Registration already exists for this event.");
        }
    
        setShowQRCode(false);
        setShowConfirmation(true);
       
    };

    const handleCloseConfirmation = () => {
       navigate('/events');
        setShowConfirmation(false);
    }
    

    useEffect(() => {
        fetchRegisterCount();
        fetchEventRegisterCount();
    }, []);

    const fetchEventRegisterCount = async () => {
        const { count, error } = await supabase.supabase
            .from('Registrations')
            .select('*', { count: 'exact' })
            .filter('event_id', 'eq', event.event_id);

        if (error) {
            console.error("Error fetching event count:", error);
        } else if (count !== null && count >= 0) {
            setEventRegisterCount(count);
            if (event.event_limit !== undefined && event.event_limit !== null && event.event_limit > 0 && count >= event.event_limit) {
                errorToast("Event registration limit reached");
                navigate('/events');
            }
        }
    };


    const fetchRegisterCount = async () => {
        const { count, error } = await supabase.supabase
            .from('Registrations')
            .select('*', { count: 'exact' });

        if (error) {
            console.error("Error fetching event count:", error);
        } else if (count !== null && count >= 0) {
            setRegisterCount(count);
            setRegisterData((prevRegisterData) => ({
                ...prevRegisterData,
                registration_id: count + 1,
            }));
        }
    };

    return (
        <Flex justifyContent={'center'} minHeight="100vh" mt={6}>
            <Box maxW="400px" w="100%" p={4} borderWidth={1} borderRadius="lg" borderColor={'black'}>
                <Heading as="h1" mb={6} textAlign="center">
                    Register
                </Heading>
                <form>
                    <Flex width={'inherit'} direction={'column'} >
                    <FormControl mb="20px">
                        <FormLabel>USN:</FormLabel>
                        <Input type="text" name="usn" value={registerData.usn} borderColor="black" onChange={(e) => handleChange(e, "usn")} />
                    </FormControl>

                    <FormControl mb="20px">
                        <FormLabel>Name:</FormLabel>
                        <Input type="text" name="name" value={registerData.user_name} borderColor="black" onChange={(e) => handleChange(e, "user_name")} />
                    </FormControl>

                    <FormControl mb="20px">
                        <FormLabel>Email:</FormLabel>
                        <Input type="email" name="email" value={registerData.email} borderColor="black" onChange={(e) => handleChange(e, "email")} />
                    </FormControl>

                    <FormControl mb="20px">
                        <FormLabel>Phone No:</FormLabel>
                        <Input type="text" name="phone" value={registerData.phone} borderColor="black" onChange={(e) => handleChange(e, "phone")} />
                    </FormControl>

                    <FormControl mb="20px" isRequired>
                        <FormLabel>Year of study:</FormLabel>
                        <Select placeholder='Select year' borderColor={'black'} name="year" value={registerData.year} onChange={(e) => handleChange(e, "year")}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Select>
                    </FormControl>

                    <FormControl mb="20px" isRequired>
                        <FormLabel>Department:</FormLabel>
                        <Select placeholder='Select department' borderColor={'black'} name="department" value={registerData.department} onChange={(e) => handleChange(e, "department")}>
                            <option value="CSE">CSE</option>
                            <option value="ISE">ISE</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                        </Select>
                    </FormControl>
                    <Flex justifyContent={'center'}>
                            <Button  colorScheme="teal" onClick={handlePayClick}>
                                Pay Rs.{event.event_price}/-
                            </Button>
                    </Flex>
                </Flex>
                   
                </form>
                <FormControl mt={4}>
                <Modal isOpen={showQRCode} onClose={handleCloseQRCode}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Payment QR Code</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Center>
                                <img src={event.QR_Code} alt="QR Code" width="150px" height="150px" />
                            </Center>
                            <FormHelperText textAlign="center" mt={2}>
                                Scan the QR code to complete the payment.
                            </FormHelperText>
                        </ModalBody>
                        <ModalFooter>
                            <Center mt={4} w="100%">
                                <Button colorScheme="teal" onClick={handleCloseQRCode}>
                                    Done
                                </Button>
                            </Center>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                </FormControl>


                <FormControl mt={4}>
                    <Modal isOpen={showConfirmation} onClose={handleCloseConfirmation}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Payment Confirmation</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box>
                                    <Heading as="h2" size="md" textAlign="center" color="green.500" mb={4}>
                                        Payment Confirmed
                                    </Heading>
                                    <Box>
                                        <p><strong>Registration ID:</strong> {registerData.registration_id}</p>
                                        <p><strong>Workshop Name:</strong>{event.event_name}</p>
                                        <p><strong>Date:</strong> {event.event_start_date}</p>
                                        <p><strong>Time:</strong> {event.event_time}</p>
                                        <p><strong>Venue:</strong> {event.venue}</p>

                                    </Box>
                                </Box>
                            </ModalBody>
                            <Center mt={4}>
                                <ModalFooter>
                                    <Button colorScheme="teal" onClick={handleCloseConfirmation}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Center>
                        </ModalContent>
                    </Modal>
                </FormControl>

            </Box>
        </Flex>
    );
}
