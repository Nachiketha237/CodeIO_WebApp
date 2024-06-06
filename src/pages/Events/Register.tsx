import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Box,
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
import Event from "./EventInterface";
import supabase from "@/config/supabaseClient";
import Registrations from './RegisterInterface';

export default function Registration() {
    const [showQRCode, setShowQRCode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state as { event: Event };
    const [registerCount, setRegisterCount] = useState<number>(-1);
    const [registerData, setRegisterData] = useState<Registrations>({
        usn: "",
        user_name: "",
        email: "",
        phone: "",
        department: "CSE", // default department
        year: "1", // default year
        event_id: event.event_id,
        payment_status: false, // initial payment status
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, inputContent: string) => {
        const { value } = e.target;
        setRegisterData((prevRegisterData) => ({
            ...prevRegisterData,
            [inputContent]: value,
        }));
    };

    const handlePayClick = async () => {
        setShowQRCode(true);
        // Perform other payment-related operations here if needed
    };

    const handleCloseQRCode = () => {
        setShowQRCode(false);
        // Optionally reset form or update state after closing modal
    };

    useEffect(() => {
        fetchEventCount();
    }, []);

    const fetchEventCount = async () => {
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
        <Center minHeight="100vh" mt={6}>
            <Box maxW="400px" w="100%" p={4} borderWidth={1} borderRadius="lg" borderColor={'black'}>
                <Heading as="h1" mb={6}  textAlign="center">
                    Register
                </Heading>
                <form>
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

                    <Center mt={4}>
                        <Button colorScheme="teal" onClick={handlePayClick}>
                            Pay Rs.{event.event_price}/-
                        </Button>
                    </Center>
                </form>

                <Modal isOpen={showQRCode} onClose={handleCloseQRCode}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Payment QR Code</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Center>
                                <img src={event.QR_Code} alt="QR Code" />
                            </Center>
                            <FormHelperText textAlign="center" mt={2}>
                                Scan the QR code to complete the payment.
                            </FormHelperText>
                        </ModalBody>
                        <ModalFooter>
                            <Center mt={4}>
                                <Button colorScheme="teal" onClick={handleCloseQRCode}>
                                    Done
                                </Button>
                            </Center>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Center>
    );
}
