import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

function Sidebar() {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-div",
          },
        }}
      >
        <div>
          <Toolbar />
          <List>
            <StyledLink to="/">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </StyledLink>
            <StyledLink to="/country">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Country" />
                </ListItemButton>
              </ListItem>
            </StyledLink>
          </List>
          <Divider />
          <List>
            <StyledLink to="/charts">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Chart" />
                </ListItemButton>
              </ListItem>
            </StyledLink>
            {/* <StyledLink to="/data">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Data" />
                </ListItemButton>
              </ListItem>
            </StyledLink> */}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
