'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingHelp from "@/app/components/listings/ListingHelp";
import CategoryView from "@/app/components/listings/LIstingCategory";
import { IconBaseProps } from "react-icons";
import useContactModal from "@/app/hooks/useContactModal";



const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const contactModal = useContactModal();
  

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);

  /*const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
  ]);*/

  /*useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);*/

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            school={listing.school}
            city={listing.campusLocation}
            description={listing.description}
            id={listing.id}
            currentUser={currentUser}
            contact={contactModal.onOpen}
          />
          { category && 
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-4">
                <category.icon size={40} className="text-neutral-600" />
                <div className="flex flex-col">
                    <div 
                      className="text-lg font-semibold"
                    >
                      {category.label}
                    </div>
                    <div 
                      className="text-neutral-500 font-light"
                    >
                      {category.description}
                    </div>
                </div>
              </div>
              <hr />
            </div>
          }
          <ListingHelp 
                help={listing.partnershipDescription}
                id={listing.id}
                currentUser={currentUser}
            />
          <hr />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
                
            </div>
        </div>
    </div>
    </Container>
           
   );
}
 
export default ListingClient;