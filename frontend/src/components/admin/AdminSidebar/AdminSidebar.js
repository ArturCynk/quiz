import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faCog, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import {SidebarContainer,SidebarHeader,SidebarLogo,SidebarNavigation,SidebarNavItem,SidebarNavLink,LogoutButton} from './styled'

const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarLogo icon={faUser} />
      </SidebarHeader>
      <SidebarNavigation>
        <SidebarNavItem>
          <SidebarNavLink to="/admin/users" data-tooltip-id="tooltip" data-tooltip-content="Users">
            <FontAwesomeIcon icon={faUsersCog} />
          </SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/admin/settings" data-tooltip-id="tooltip" data-tooltip-content="Settings">
            <FontAwesomeIcon icon={faCog} />
          </SidebarNavLink>
        </SidebarNavItem>
      </SidebarNavigation>
      <LogoutButton data-tooltip-id="tooltip" data-tooltip-content="Logout">
        <FontAwesomeIcon icon={faSignOutAlt} />
      </LogoutButton>
      <Tooltip id="tooltip" place="right" effect="solid" />
    </SidebarContainer>
  );
};

export default AdminSidebar;
