import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    title,
    description,
    subtitle,
    imageSrc,
    category,
    school,
    campusLocation,
    emailContact,
    phoneContact,
    partnershipDescription
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      subtitle,
      imageSrc,
      category,
      school,
      campusLocation,
      emailContact,
      phoneContact,
      partnershipDescription,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}