import { useState ,useEffect, ChangeEvent} from 'react';
import { Box, FormHelperText, FormControl, FormLabel, Input, Heading, Center, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
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
        event_id: event.event_id,
        payment_status: true
	});
    

    const handlePayClick = async () => {
        setShowQRCode(true);
        if(registerData.payment_status === true){
        const { data, error } = await supabase.supabase
			.from('Registrations')
			.insert([registerData]);
        
		if (error) {
			console.error("Error updating event data:", error);
		} else {
			console.log("data updated successfully:", data);
            navigate(`/events`);
        }
    }
};

    const handleCloseQRCode = () => {
        setShowQRCode(false);
        setRegisterData((prevRegisterData) => ({
            ...prevRegisterData,
            payment_status: true
        }));
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>, inputContent: string) => {
		const { value } = e.target;
		setRegisterData((prevRegisterData) => ({
			...prevRegisterData,
			[inputContent]: value,
		}));
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
        } else if (count !== null && count>=0) {
          setRegisterCount(count);
            setRegisterData((prevRegisterData) => ({
                ...prevRegisterData,
                registration_id: count + 1
            }));
        }
      };

    return (
        <Center minHeight="100vh">
            <Box maxW="400px" w="100%" p={4} borderWidth={1} borderRadius="lg" borderColor={'black'}>
                <Heading as="h1" mb={6} textAlign="center">
                    Register
                </Heading>
                <Form>
                    <FormControl mb="20px">
                        <FormLabel>USN:</FormLabel>
                        <Input type="text" name="usn" value={registerData.usn} borderColor="black" onChange={(e) => handleChange(e, "usn")}/>
                    </FormControl>

                    <FormControl mb="20px">
                        <FormLabel>Name:</FormLabel>
                        <Input type="text" name="name" value={registerData.user_name} borderColor="black" onChange={(e) => handleChange(e, "user_name")}/>
                    </FormControl>

                    <FormControl mb="20px">
                        <FormLabel>Email:</FormLabel>
                        <Input type="email" name="email" value={registerData.email} borderColor="black" onChange={(e) => handleChange(e, "email")}/>
                    </FormControl>

                    <FormControl mb="20px">
                        <FormLabel>Phone No:</FormLabel>
                        <Input type="text" name="phone" value={registerData.phone} borderColor="black" onChange={(e) => handleChange(e, "phone")}/>
                    </FormControl>

                    <Center mt={4}>
                       <Button colorScheme="teal" onClick={handlePayClick}>
                            Pay Rs.{event.event_price}/-
                       </Button>
                    </Center>
                    
                    <FormControl>
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
                            <Center mt={4}>
                            <ModalFooter>
                                <Button colorScheme="teal" onClick={handleCloseQRCode}>
                                    Done
                                </Button>
                            </ModalFooter>
                          </Center>
                        </ModalContent>
                      </Modal>
                    </FormControl>
                </Form>
            </Box>
        </Center>
    );
}
