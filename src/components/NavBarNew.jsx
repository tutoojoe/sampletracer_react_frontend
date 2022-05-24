import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Flag, KeyboardArrowDown } from "@mui/icons-material";
const NavBarNew = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [open, setOpen] = useState(false);
  //   const open = Boolean[anchorEl];
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Flag />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sampletracer App
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">Homepage</Button>
          <Button color="inherit">Products</Button>
          <Button color="inherit">Merchs</Button>
          <Button
            color="inherit"
            id="resources-button"
            onClick={handleClick}
            aria-control={open ? "resources-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
          >
            Resources
          </Button>

          <Button color="inherit">Contact us</Button>
        </Stack>
        <Menu
          id="resources-menu"
          open={open}
          anchorEl={anchorEl}
          MenuListProps={{
            "aria-labelledby": "resources-button",
          }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClose={handleClose}>Blog</MenuItem>
          <MenuItem onClose={handleClose}>Podcast</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarNew;
