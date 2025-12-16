"use client";

import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Typography,
  Box
} from "@mui/material";

import Uploadmovies from "./components/uploadmovietodb";
import Uploadwebseries from "./components/uploadwebseries";
import Uploadpodcast from "./components/uploadpocast";


const drawerWidth = 240;

export default function SidebarLayout() {
  const [content, setmaincontent] = React.useState("Movies");

  return (
    <Box sx={{ display: "flex" }}>
      {/* LEFT SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#24404b",
            color: "#d2f7f4"
          }
        }}
      >
        {/* BRAND HEADER */}
        <Box
          sx={{
            padding: "16px 10px",
            borderBottom: "1px solid rgba(255,255,255,0.15)"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              color: "#d2f7f4"
            }}
          >
            Show Time
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              opacity: 0.7,
              marginTop: "-2px"
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* MENU LIST */}
        <List sx={{ marginTop: 1, borderBottom: "1px solid black" }}>
          {["Home", "Movies", "Webseries", "BigBoss", "Podcast"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => setmaincontent(text)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List sx={{ marginTop: 1 }}>
          {["Settings", "Logout"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* RIGHT SIDE MAIN AREA */}
      <Box sx={{ flexGrow: 1 }}>
        {/* TOP NAVBAR */}
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "#24404b"
          }}
        />

        {content === "Movies" ? (
          <Uploadmovies />
        ) : content === "Webseries" ? (
          <Uploadwebseries />
        ) : content === "Podcast" ? (
          <Uploadpodcast />
        ) : (
          <p>nothing...........</p>
        )}

      </Box>
    </Box>
  );
}
