import { Nunito } from "next/font/google"
import Navbar from "./components/navbar/Navbar"
import ClientOnly from "./components/ClientOnly"
import RegisterModal from "./components/modals/RegisterModal"

import ToasterProvider from "./providers/ToasterProvider"

import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LoginModal from "./components/modals/LoginModal"
import getCurrentUser from "./actions/getCurrentUser"


const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KampusView',
  description: 'Clone for Krumble platform',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
          {children}
      </body>
    </html>
  )
}
