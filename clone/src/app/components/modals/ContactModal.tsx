'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";

import useContactModal from "@/app/hooks/useContactModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

interface ContactModalProps {
    email: string;
    website?: string;
    phone?: string;
    socials?: string[];
}
  

const ContactModal: React.FC<ContactModalProps> = ({
  email,
  website,
  phone,
  socials
}) => {
  
    const router = useRouter();
    const contactModal = useContactModal();
    const [isLoading, setIsLoading] = useState(false);


      const bodyContent = (
        <div className="flex flex-col gap-4">
          email: {email}
          <hr />
          website: {website}
          <hr />
          phone: {phone}
          <hr />
          réseaux sociaux: 
        </div>
      )

      const footer = (<div></div>)
    

    return (
        <Modal
          disabled={isLoading}
          isOpen={contactModal.isOpen}
          title="Contact"
          onClose={contactModal.onClose}
          onSubmit={contactModal.onClose}
          body={bodyContent}
          footer={footer}
        />
      );
}

export default ContactModal;