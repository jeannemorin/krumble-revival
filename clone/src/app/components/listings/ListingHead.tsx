'use client';

import Image from "next/image";

import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { MouseEvent, useCallback, useState } from "react";
import { BsMailbox } from 'react-icons/bs';

import useContactModal from "@/app/hooks/useContactModal";

interface ListingHeadProps {
  title: string;
  school: string;
  city: string;
  description: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
  contact: () => void;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  school,
  city,
  description,
  imageSrc,
  id,
  currentUser,
  contact
}) => {

  
  return ( 
    <div>
      
      <div className="
          overflow-hidden 
          rounded-xl
          relative
          h-[40vh]
          w-full
        ">
          
            <Image
            src={imageSrc}
            fill
            className="object-cover w-full"
            alt="Image"
            />
            <div className="absolute top-5 right-5">
                <HeartButton 
                    listingId={id}
                    currentUser={currentUser}/>
            </div>
      </div>

        <div className="py-6">
            <Heading
                title={title}
                subtitle={`${school}, ${city}`}
            />
            <div className=" mt-10 mb-6">
                {description}
            </div>
            <div className="w-[150px]">
              <Button 
                  label={"Contacter"}
                  onClick={contact}
              />
            </div>
        </div>
      
    </div>
   );
}
 
export default ListingHead;