import 'overlayscrollbars/css/OverlayScrollbars.css'
import { useRouter } from 'next/router'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { FiBell, FiLogIn, FiUser } from 'react-icons/fi'
import { CgInfinity } from 'react-icons/cg'
import { BiHomeAlt, BiAtom } from 'react-icons/bi'
import NavLink from './NavLink'
import Logo from '@/components/Logo'
import { usePlanets } from '@/hooks/usePlanets'
import Tippy from '@tippyjs/react'
import Image from 'next/image'
import React from 'react'

const exploreButton = `
  text-blue-500
  hover:text-white
  bg-transparent
  hover:bg-blue-500
  font-header
  cursor-pointer
  ml-auto
  py-1
  px-4
  rounded-full
  border
  border-gray-200
  dark:border-gray-700
  hover:border-blue-500
  transition 
  ease-in-out 
  duration-200 
  inline-flex 
  items-center
  transform
  hover:shadow-lg
`

function TopPlanets() {
  const { isLoading, isError, data, error } = usePlanets({
    sort: 'TOP',
    pageSize: 5
  })

  if (isLoading || isError) return null

  return (
    <div>
      {data.map(planet => (
        <NavLink
          className="sidebar-item"
          key={planet.id}
          href="/+[planet]"
          as={`/+${planet.name}`}
        >
          {planet.avatarURL ? (
            <Image
              width={20}
              height={20}
              src={planet.avatarURL}
              className="w-5 h-5 rounded-full"
              alt={planet.name}
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700" />
          )}

          <span className="ml-6">{planet.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

function LeftSidebar() {
  const router = useRouter()

  return (
    <OverlayScrollbarsComponent>
      <nav
        className="fixed z-20 flex flex-col overflow-y-auto bg-white dark:bg-gray-800 shadow-lg min-h-full h-full hidden sm:block"
        style={{ width: '17.5rem' }}
      >
        <div className="mx-5 pt-3 pb-3 mb-2 border-b border-gray-200 dark:border-gray-700 flex flex-row items-center">
          <NavLink href="/" className="ml-1.5 mr-auto">
            <Logo className="w-32 dark:text-gray-200 text-black" />
          </NavLink>
          <NavLink
            href="/notifications"
            className="ml-4 hover:scale-125 transform duration-150 ease-in-out text-tertiary rounded-full hover:bg-gray-700 transition w-9 h-9 p-2"
          >
            <FiBell className="w-5 h-5" />
          </NavLink>
        </div>
        <div className="text-gray-500">
          <NavLink href="/" className={`sidebar-item navitem-active`}>
            <BiHomeAlt className="w-5 h-5" />
            <span className="ml-6">Home</span>
          </NavLink>
          <NavLink href="/universe" className="sidebar-item">
            <CgInfinity className="w-5 h-5" />
            <span className="ml-6">Universe</span>
          </NavLink>
          <Tippy content="This feature is coming soon">
            <div className="sidebar-item cursor-pointer">
              <BiAtom className="w-5 h-5 text-disabled" />
              <span className="ml-6 text-disabled">Orbit (Coming Soon)</span>
            </div>
          </Tippy>

          <NavLink href="/login" className="sidebar-item">
            <FiLogIn className="w-5 h-5 text-blue-500" />
            <span className="ml-6 text-blue-500">Log In/Sign Up</span>
          </NavLink>
        </div>

        <div className="px-6 mt-5 mb-3 flex flex-row items-center">
          <div className="text-tertiary font-header">Top Planets</div>
          <div className={exploreButton}>More</div>
        </div>

        <TopPlanets />
      </nav>
    </OverlayScrollbarsComponent>
  )
}

export default LeftSidebar
