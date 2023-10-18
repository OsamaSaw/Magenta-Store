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
const drawerWidth = 240;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;
  return {
    props: {
      pid,
    },
  };
};

const Profile = ({ pid, window }: { pid: string; window: Window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onSubmit = async (data: LoginMail) => {
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
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
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
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
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
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
            <div className="space-x-4 text-white mb-3">
              <span>Reset Password:</span>
              <button
                onClick={() => router.push("/forgot-password")}
                type="button"
                className="btn btn--rounded btn--yellow"
              >
                Reset
              </button>
            </div>
            <hr className="solid" style={{ width: "50%" }} />
            <div className="space-y-5 mt-3 text-white w-[50%]">
              <span>Change your email:</span>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__input-row">
                  <input
                    className="form__input"
                    placeholder="email"
                    type="text"
                    name="email"
                    ref={register({
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />

                  {errors.email && errors.email.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}

                  {errors.email && errors.email.type === "pattern" && (
                    <p className="message message--error">
                      Please write a valid email
                    </p>
                  )}
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register({ required: true })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn--rounded btn--yellow btn-submit"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <span>Transactions</span>
          </div>
        )}
      </Box>
    </Box>
  );
};
export default Profile;
