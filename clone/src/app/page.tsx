import Image from 'next/image'
import styles from './page.module.css'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getListings from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <Container>
          <EmptyState showReset />
      </Container>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className='
        pt-24 
        grid 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-8'>
            {listings.map((listing: any) => {
              return (
                <ListingCard 
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing} />
              )
            })}
        </div>
      </Container>
    </ClientOnly>
  )
}
