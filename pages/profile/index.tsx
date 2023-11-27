import { GetServerSideProps } from "next";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoMdSettings } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Transactions } from "./transactions";
import Layout from "../../layouts/Main";
const drawerWidth = 240;

const Profile = ({ window }: { window: Window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onSubmit = async (data: any) => {
    const res = await postData(`${server}/api/login`, {
      email: data.email,
      password: data.password,
    });

    console.log(res);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setCurrentPage(0)}>
            <ListItemIcon>
              <IoMdSettings />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setCurrentPage(1)}>
            <ListItemIcon>
              <GrTransaction />
            </ListItemIcon>
            <ListItemText primary={"Transactions"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
  return (
    <Layout>
      <Box sx={{ display: "flex", position: "relative", zIndex: 0 }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          sx={{
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <GiHamburgerMenu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          {/* <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer> */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {currentPage == 0 ? (
            <div>
              <div className="space-y-5 mt-3 text-white w-[100%] lg:w-[50%] mr-auto ml-auto">
                <span>Reset Password:</span>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      type="password"
                      placeholder="Old password"
                      name="oldPassword"
                      ref={register({ required: true })}
                    />
                    {errors.oldPassword &&
                      errors.oldPassword.type === "required" && (
                        <p className="message message--error">
                          This field is required
                        </p>
                      )}
                  </div>

                  <div className="form__input-row">
                    <input
                      className="form__input"
                      type="password"
                      placeholder="New password"
                      name="newPassword"
                      ref={register({ required: true })}
                    />
                    {errors.newPassword &&
                      errors.newPassword.type === "required" && (
                        <p className="message message--error">
                          This field is required
                        </p>
                      )}
                  </div>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      type="password"
                      placeholder="Repeat password"
                      name="repeatPassword"
                      ref={register({ required: true })}
                    />
                    {errors.repeatPassword &&
                      errors.repeatPassword.type === "required" && (
                        <p className="message message--error">
                          This field is required
                        </p>
                      )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn--rounded btn--yellow btn-submit"
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <span>
                <Transactions />
              </span>
            </div>
          )}
        </Box>
      </Box>
    </Layout>
  );
};
export default Profile;
