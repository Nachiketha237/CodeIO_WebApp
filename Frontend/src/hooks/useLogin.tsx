import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useAuth } from '../context/authProvider';
import { useNavigate } from 'react-router-dom';
interface UserLoginCreds {
    email: string;
    password: string;
}

type UseLoginReturns = [
    loading: boolean,
    error: unknown,
    login: (credentials: UserLoginCreds) => Promise<void>
];

function useLogin(): UseLoginReturns {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(undefined);
    const auth = useAuth();
    const navigate = useNavigate();

    async function login({ email, password }: UserLoginCreds) {
        try {
            setLoading(true);

            if (email === "" || password === "") {
                throw new Error("Fill all the fields");
            }

            console.log("Sending login request to Supabase with:", { email, password });

            const { data, error } = await supabase.supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                throw new Error(error.message);
            }
            console.log("Login response:", data);
            if (!data?.session || !data.user) {
                throw new Error("The entered user doesn't exist");
            }
            
            if(data.user!=null){
               auth.setIsLoggedIn(true);
               navigate("/admin");
            }

        } catch (e: unknown) {
            console.error("Login error:", e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return [loading, error, login];
}

export { useLogin };
export type { UseLoginReturns };
