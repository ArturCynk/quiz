import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import { SidebarContainer, SidebarHeader, SidebarLogo, SidebarNavigation, SidebarNavItem, SidebarNavLink, LogoutButton } from './styled';

const UserSidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarLogo icon={faUser} />
      </SidebarHeader>
      <SidebarNavigation>
        <SidebarNavItem>
          <SidebarNavLink to="/user/profile" data-tooltip-id="tooltip" data-tooltip-content="Profile">
            <FontAwesomeIcon icon={faUser} />
          </SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/user/settings" data-tooltip-id="tooltip" data-tooltip-content="Settings">
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

export default UserSidebar;
