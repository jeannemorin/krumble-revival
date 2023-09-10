'use client';

import Image from "next/image";

import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { MouseEvent } from "react";
import { BsMailbox } from 'react-icons/bs';

interface ListingHeadProps {
  title: string;
  school: string;
  city: string;
  description: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  school,
  city,
  description,
  imageSrc,
  id,
  currentUser
}) => {


  return ( 
    <div className="flex flex-row w-full gap-5">
      
      <div className="
          overflow-hidden 
          rounded-xl
          relative
          h-[500px]
          w-[500px]
        ">
            <Image
            src={imageSrc}
            fill
            className="object-cover "
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
            <hr className="mt-5"/>
            <div className="w-[500px] mt-10 mb-10">
                {description}
            </div>
            <Button 
                label={"Contacter"}
                icon={BsMailbox} 
                onClick={() => {}}
            />
        </div>
      
    </div>
   );
}
 
export default ListingHead;