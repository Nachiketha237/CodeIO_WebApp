import { useState, useEffect, ChangeEvent } from 'react';
import { Button, FormControl, FormLabel, Input, Center, Box, Heading} from '@chakra-ui/react';
import { errorToast } from '../../utils/toast';
import  supabase from '../../config/supabaseClient';

function Forgot() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

   

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {  value } = e.target; 
            setEmail(value);
        
    };
    

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
           
        let { data, error } = await supabase.supabase.auth.resetPasswordForEmail(email)
    
            if (error) {
                errorToast((error as Error).message);
            }

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Center minHeight="100vh" mt={12} >
            <Box maxW="400px" w="100%" p={4} borderWidth={1} borderRadius="lg" borderColor={'black'} >
                <Heading as="h1" mb={6} textAlign="center">
                    Login
                </Heading>
                <form onSubmit={onFormSubmit}>
                    <FormControl mb="20px">
                        <FormLabel>Email:</FormLabel>
                        <Input type="email" name="email" value={email} borderColor="black" onChange={handleChange} />
                    </FormControl>


                    <Center mt={4}>
                        <Button colorScheme="teal" type="submit" >
                            Submit
                        </Button>
                        
                    </Center>
                    
                </form>
            </Box>
        </Center>
    );
}

export default Forgot;
