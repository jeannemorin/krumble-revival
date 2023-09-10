import Image from 'next/image'
import styles from './page.module.css'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getListings from './actions/getListings';

export default async function Home() {
  const listings = await getListings();

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
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-6
        gap-8'>
          <div>
            {listings.map((listing: any) => {
              return (
                <div>{listing.title}</div>
              )
            })}
          </div>  
        </div>
      </Container>
    </ClientOnly>
  )
}
