import { Box, MenuGroup, MenuItem, MenuItemProps } from "@looker/components"
import * as React from "react"
import { Link as RouterLink, LinkProps } from "react-router-dom"
import styled from "styled-components"
import { SidebarProps } from "./"
import omit from "lodash/omit"
import { ROUTES } from '../../App'

export const Sidebar: React.FC<SidebarProps> = ({ pathname }) => {
  return (
    <Box display="flex" flexDirection="column">
      <MenuGroup type="none" mt="xsmall">
        <StyledRouterLink to={ROUTES.API_ROUTE}>
          <MenuItem icon="Flag" current={pathname === ROUTES.API_ROUTE}>
            Api Functions
          </MenuItem>
        </StyledRouterLink>
        <StyledRouterLink to={ROUTES.CORESDK_ROUTE}>
          <MenuItem icon="Clock" current={pathname === ROUTES.CORESDK_ROUTE}>
            Core SDK Functions
          </MenuItem>
        </StyledRouterLink>
      </MenuGroup>
    </Box>
  )
}

const StyledRouterLinkInner: React.FC<LinkProps & MenuItemProps> = props => (
  <RouterLink {...omit(props, "customizationProps")} />
)

const StyledRouterLink = styled(StyledRouterLinkInner)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`
