"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  MessageCircle,
  Search,
  User,
  PlusSquare,
  Bell, 
} from "lucide-react"

const Navbar = () => {

  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Create", href: "/create", icon: PlusSquare },
    { name: "Chats", href: "/chats", icon: MessageCircle },
    { name: "Me", href: "/me", icon: User },
    {name : "Notifications", href:"/notification", icon: Bell}
  ]

  return (
    <>
      
      <div className="hidden md:flex fixed top-0 left-0 w-full bg-[#0f0f0f] border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto w-full px-6 py-3 flex justify-between items-center">

          
          <h1 className="text-xl font-bold text-white">Traveller</h1>

          
          <div className="flex gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href

              return (
                <Link key={item.name} href={item.href}>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg transition
                    ${active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}
                  `}>
                    <Icon size={18} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </div>

    
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0f0f0f] border-t border-gray-800 z-50">
        <div className="flex justify-around items-center py-2">

          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex flex-col items-center text-xs
                  ${active ? "text-white" : "text-gray-400"}
                `}>
                  <Icon size={22} />
                </div>
              </Link>
            )
          })}

        </div>
      </div>
    </>
  )
}

export default Navbar