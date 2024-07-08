import { useState, useEffect, ChangeEvent } from 'react';
import { Button, FormControl, FormLabel, Input, Center, Box, Heading} from '@chakra-ui/react';
import { useLogin, UseLoginReturns } from '../../hooks/useLogin';
import { errorToast } from '../../utils/toast';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, error, login]: UseLoginReturns = useLogin();

    useEffect(() => {
        if (error) {
            errorToast((error as Error).message);
        }
    }, [error]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login({ email, password });
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

                    <FormControl mb="20px">
                        <FormLabel>Password:</FormLabel>
                        <Input type="password" name="password" value={password} borderColor="black" onChange={handleChange} />
                    </FormControl>

                    <Center mt={4}>
                        <Button colorScheme="teal" type="submit" >
                            Submit
                        </Button>
                        
                    </Center>
                    {/* <Center mt={4}>
                        <Link to ="/forgot_password">Forgot password</Link>
                    </Center> */}
                </form>
            </Box>
        </Center>
    );
}

export default Login;
