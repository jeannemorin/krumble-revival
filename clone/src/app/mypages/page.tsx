import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import MyPagesClient from "./MyPagesClient";

const MyAssoPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Non authorisé"
      subtitle="Connectez-vous"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Pas d'association trouvée"
          subtitle="On dirait que vous n'avez créé aucune page asso."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyPagesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default MyAssoPage;