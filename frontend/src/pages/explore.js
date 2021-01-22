import { usePlanets } from '@/lib/queries/usePlanets'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import ExploreLeftSidebar from '@/components/explore/ExploreLeftSidebar'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'
import PageNavigator from '@/components/layout/PageNavigator'
import NavLink from '@/components/NavLink'
import { HiSearch } from 'react-icons/hi'
import { useSlideout } from '@/lib/useSlideout'
import Header from '@/components/layout/Header'

export default function ExplorePage() {
  const { query } = useRouter()

  const variables = {
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort
      ? query.sort.toUpperCase()
      : query.galaxy
      ? 'AZ'
      : 'FEATURED',
    galaxy: query.galaxy ? query.galaxy : null
  }
  const { data } = usePlanets(variables)

  const planets = data ? data.planets : []

  const {
    slideoutRight,
    slideoutLeft,
    menuLeft,
    menuRight,
    header,
    panel
  } = useSlideout()

  return (
    <>
      <ExploreLeftSidebar ref={menuLeft} />

      <Header
        title="Explore Planets"
        slideoutLeft={slideoutLeft}
        ref={header}
        mobileOnly
      />

      <main
        className="slideout-panel slideout-panel--header-mobile"
        id="panel"
        ref={panel}
      >
        <AutoSizer>
          {({ width, height }) => (
            <Scrollbar mobileNative style={{ width, height }}>
              <div className="px-8 py-8">
                <div className="flex pb-8 items-center justify-center">
                  <div className="shadow-md max-w-screen-sm w-full flex h-10 relative bg-white dark:bg-gray-600 rounded-md dark:text-gray-400 transition dark:focus-within:text-white">
                    <input
                      className="h-full dark:bg-gray-600 rounded-l-md text-sm px-4 flex-grow focus:outline-none dark:text-white dark:placeholder-gray-400 font-medium"
                      placeholder="Search planets"
                    />
                    <button
                      type="button"
                      className="rounded-r-md inline-flex justify-center items-center h-10 w-10 cursor-pointer"
                    >
                      <HiSearch className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="py-4 text-secondary text-lg font-medium">
                  Top Planets
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
                  {planets.map(planet => (
                    <PlanetCard planet={planet} key={planet.id} />
                  ))}
                </div>
              </div>
              <PageNavigator nextEnabled={!!data?.nextPage} />
            </Scrollbar>
          )}
        </AutoSizer>
      </main>
    </>
  )
}

function PlanetCard({ planet }) {
  return (
    <NavLink
      href={`/planet/${planet.name}`}
      className="rounded-lg group dark:bg-gray-850 dark:hover:bg-gray-900 duration-200 relative flex flex-col transform transition hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
    >
      <div
        className="h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative dark:bg-gray-800"
        style={
          planet.bannerUrl
            ? { backgroundImage: `url(${planet.bannerUrl})` }
            : undefined
        }
      >
        <div className="absolute inline-flex items-center justify-center w-12 h-12 ring-4 dark:ring-gray-850 transition rounded-full group-hover:shadow-md -bottom-3 left-4 dark:bg-gray-850">
          {planet.avatarUrl ? (
            <img
              alt={planet.name}
              src={planet.avatarUrl}
              className="w-full h-full rounded-full"
            />
          ) : (
            <div className="header-2 text-mid">{planet.name[0]}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow px-4 pt-6 pb-4 h-40">
        <div className="text-base font-medium text-secondary">
          {planet.name}
        </div>

        <div className="text-13 text-tertiary line-clamp-3">
          {planet.description || 'New CometX Planet'}
        </div>

        <div className="flex space-x-6 mt-auto text-xs">
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            <div className="ml-1.5 text-green-600">
              {parseInt(Math.random() * planet.userCount)} online
            </div>
          </div>
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <div className="ml-1.5 text-tertiary">
              {planet.userCount} member
              {planet.userCount === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

/*
export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  await globalPrefetch(queryClient, ctx)

  const variables = {
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort
      ? query.sort.toUpperCase()
      : query.galaxy
      ? 'AZ'
      : 'FEATURED',
    galaxy: query.galaxy ? query.galaxy : null
  }

  await queryClient.prefetchQuery(['planets', variables], key =>
    fetchPlanets(key, ctx)
  )

  return {
    props: {
      variables,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
*/