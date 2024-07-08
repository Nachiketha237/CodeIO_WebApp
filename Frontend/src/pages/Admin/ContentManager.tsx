import { useEffect,useState } from "react";
import {Box,Heading,Text} from "@chakra-ui/react";

const ContentManager = () => {
    return (
        <Box>
            <Heading>Content Manager</Heading>
            <Text>Content Manager is a tool to manage the content of the website.</Text>
            <Text>It allows you to create, edit, and delete content.</Text>
        </Box>
    );
    };

export default ContentManager;