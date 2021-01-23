import React, { forwardRef } from 'react'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { HiUserAdd } from 'react-icons/hi'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'

export default forwardRef((props, ref) => {
  return (
    <Sidebar ref={ref}>
      <div className="w-full h-12 flex items-center px-4">
        <Logo className="h-4" />
      </div>
      <div className="px-1">
        <div className="sidebar-label">FEED</div>

        <SidebarSortButtons />

        <div className="sidebar-label">DIRECT MESSAGES</div>
        <div className="space-y-0.5">
          <div className="sidebar-item sidebar-item--large">
            <HiUserAdd className="w-5 h-5 mr-3" />
            New DM
          </div>
        </div>
      </div>
    </Sidebar>
  )
})