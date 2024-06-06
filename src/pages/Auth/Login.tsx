import { useState, useEffect } from 'react';
import styles from './styles/Login.module.css';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useLogin, UseLoginReturns } from '../../hooks/useLogin';
import { errorToast } from '../../utils/toast';


function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [loading, error, login]: UseLoginReturns = useLogin();

    useEffect(() => {
        if (error) {
            errorToast((error as Error).message);
        }
        
    }, [error]);
    
    async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
             login({ email, password })  
           
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.formContainer}>
            <p className={styles.formTitle}>Login</p>
        
            <form onSubmit={onFormSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </FormControl>

                <Button type="submit" mt={4}>Login</Button>
            </form>
        </div>
    );
}

export default Login;
