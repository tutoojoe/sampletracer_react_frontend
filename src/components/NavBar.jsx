import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../store/auth";
import { loginActions } from "../store/loginSlice";
import { useNavigate, NavLink } from "react-router-dom";
import LogoutConfirmAlert from "../components/Alerts/LogoutConfirmAlert";

const pages = [
  { menuId: 1, menuItem: "Live Status" },
  { menuId: 2, menuItem: "Customers" },
  { menuId: 3, menuItem: "Merchandisers" },
  { menuId: 4, menuItem: "Suppliers" },
  { menuId: 5, menuItem: "Store" },

  // "Live Status",
  // "Customers",
  // "Merchandisers",
  // "Suppliers",
  // "Store",
];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const settings = [
  { id: 1, item: "Profile" },
  { id: 2, item: "Account" },
  { id: 3, item: "Dashboard" },
  { id: 4, item: "Logout" },
];

const NavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // to control logout
  const isAuth = useSelector((state) => state.login.isAuth);
  const logStatus = useSelector((state) => state.login.logoutStatus);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    console.log(event.currentTarget, "inside openNavMenu");
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log(event.currentTarget, "inside openUserMenu");

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (id) => {
    console.log("inside closenavmenu", id);
    if (id === 1) {
      console.log("live status");
      navigate("/");
    } else if (id === 2) {
      console.log("customers page");
      navigate("customers/");
    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (id) => {
    console.log("inside closeuserMenu");
    console.log("selected item", id);
    if (id === 1) {
      console.log("profile selected");
    } else if (id === 2) {
      console.log("Account selected");
    } else if (id === 3) {
      console.log("Dashboard requested");
    } else if (id === 4) {
      console.log("logout requested");

      dispatch(loginActions.logOutPending());

      // dispatch(loginActions.logOut());
    }
    setAnchorElUser(null);
  };

  // const handleSelectFn = (e) => {
  //   const selectedAction = e.currentTarget.innerHTML;
  //   if (selectedAction === "Logout") {
  //     console.log("logout clicked");
  //     // dispatch(authActions.logout());
  //     dispatch(loginActions.logOut());
  //   }
  // };

  return (
    <div>
      {isAuth && logStatus && <LogoutConfirmAlert />}

      {isAuth && (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  SampleTracer
                </NavLink>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.menuId}
                      onClick={() => {
                        handleCloseNavMenu(page.menuId);
                      }}
                    >
                      <Typography textAlign="center">
                        {page.menuItem}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  SampleTracer
                </NavLink>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.menuId}
                    onClick={() => {
                      handleCloseNavMenu(page.menuId);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.menuItem}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}

                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.id}
                      onClick={() => {
                        handleCloseUserMenu(setting.id);
                      }}
                    >
                      <Typography textAlign="center">{setting.item}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
};
export default NavBar;
