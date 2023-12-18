import Box from "@mui/material/Box";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Transactions } from "./transactions";
import Layout from "../../layouts/Main";
import { MdManageAccounts } from "react-icons/md";
import { HiMiniKey } from "react-icons/hi2";
import {useSession} from "next-auth/react";

// const drawerWidth = 240;

const Profile = ({ window }: { window: Window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const { data: session } = useSession();
  if (session) {
    console.log(session); // This will have user info like name, email, image, etc.

  }
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

  // const drawer = (
  //   <div>
  //     <Toolbar />
  //     <Divider />
  //     <List>
  //       <ListItem disablePadding>
  //         <ListItemButton onClick={() => setCurrentPage(0)}>
  //           <ListItemIcon>
  //             <IoMdSettings />
  //           </ListItemIcon>
  //           <ListItemText primary={"Settings"} />
  //         </ListItemButton>
  //       </ListItem>
  //       <ListItem disablePadding>
  //         <ListItemButton onClick={() => setCurrentPage(1)}>
  //           <ListItemIcon>
  //             <GrTransaction />
  //           </ListItemIcon>
  //           <ListItemText primary={"Transactions"} />
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //   </div>
  // );
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-screen mr-auto ml-auto lg:w-[70%]">
        <div className="bg-[#292929] w-full lg:w-[300px]">
          <div
            className={`bg-[#333333] h-10 my-2 cursor-pointer ${
              Boolean(currentPage == 0) &&
              "border-l-[3px] border-orange-400 border-solid"
            } flex flex-row items-center`}
            onClick={() => setCurrentPage(0)}
          >
            <MdManageAccounts size={25} className="inline-block mx-2" />
            <span className="text-sm">Account Overview</span>
          </div>
          <div
            className={`bg-[#333333] h-10 my-2 cursor-pointer ${
              Boolean(currentPage == 1) &&
              "border-l-[3px] border-orange-400 border-solid"
            } flex flex-row items-center`}
            onClick={() => setCurrentPage(1)}
          >
            <HiMiniKey size={20} className="inline-block mx-2" />
            <span className="text-sm">ORDER HISTORY & KEYS</span>
          </div>
        </div>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          {currentPage == 0 ? (
            <div>
              <div className="space-y-5 mt-3 text-white mr-auto ml-auto">
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
      </div>
    </Layout>
  );
};
export default Profile;
