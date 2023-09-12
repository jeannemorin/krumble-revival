'use client'

import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import ListingHead from "./ListingHead";


interface ListingHelpProps {
  help: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHelp: React.FC<ListingHelpProps> = ({
    help,
    id,
    currentUser
}) => {
  
  
    return ( 
        <div>
            <Heading 
                title="Pourquoi nous aider ?"
            />
            {help}
        </div>);
}

export default ListingHelp;
