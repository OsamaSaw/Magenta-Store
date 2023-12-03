import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ProductType } from "types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../firebase";
import { documentId } from "firebase/firestore";
import Layout from "../../layouts/Main";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;
  // const res = await fetch(`${server}/api/product/${pid}`);
  // const product = await res.json();

  return {
    props: {
      pid,
    },
  };
};

const currentOrder = {
  id: "1",
  date: "Jun 10,2022",
  orderNum: "124585464165",
  status: "complete",
  total: "1.50$",
  items: [
    { id: "5PSmCyjj2kNzeAKOXUtx", key: "ada2s2d-asdasd-asdasd" },
    { id: "5lf1JWeAQk1mXH8gRQKw", key: "a55dasd-as-55asdasd" },
  ],
};

const Order = ({ pid }: { pid: string }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const fetchProducts = async () => {
    // currentOrder.items.forEach(async (element) => {
    const q = query(
      collection(db, "PRODUCTS"),
      where(
        documentId(),
        "in",
        currentOrder.items?.map((item) => item.id)
      )
    );
    const querySnapshot = await getDocs(q);
    const newData: any = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(newData);
    setProducts(newData);
    // });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Layout>
      <div className="flex-1 bg-[#1c1c1c] pt-10 px-[10%]">
        <span className="text-2xl text-white m-5">Order Details</span>
        <TableContainer
          sx={{
            backgroundColor: "#292929",
            marginLeft: "auto",
            marginRight: "auto",
            marginY: "10px",
          }}
          component={Paper}
        >
          <Table
            id="myTable"
            sx={{
              backgroundColor: "#292929",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ORDER NUMBER</TableCell>
                <TableCell align="left">DATE</TableCell>
                <TableCell align="left">STATUS</TableCell>
                <TableCell align="center">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={currentOrder.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{currentOrder.orderNum}</TableCell>
                <TableCell align="left">{currentOrder.date}</TableCell>
                <TableCell align="left">{currentOrder.status}</TableCell>
                <TableCell align="center">{currentOrder.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <span className="text-2xl text-white m-5">Order items</span>

        <TableContainer
          sx={{
            backgroundColor: "#292929",
            marginLeft: "auto",
            marginRight: "auto",
            marginY: "10px",
          }}
          component={Paper}
        >
          <Table
            sx={{
              backgroundColor: "#292929",
            }}
            aria-label="simple table"
            id="orderMobile"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Boolean(products) &&
                products.map((item, index) => {
                  return (
                    <React.Fragment key={item.id + index}>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          {
                            <img
                              className="w-20 h-20 object-cover"
                              src={item.Thumb}
                            />
                          }
                        </TableCell>
                        <TableCell align="left">
                          {
                            <div className="flex flex-col">
                              <span className="text-lg">
                                {item.ProgramName}
                              </span>
                              <span>platforms</span>
                            </div>
                          }
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex flex-col md:hidden items-start">
                            <span className="text-lg">{item.ProgramName}</span>
                            <span>platforms</span>
                          </div>
                          <div className="flex flex-col lg:items-end items-center mr-auto ml-auto">
                            <div className="w-full md:w-3/4 flex flex-col lg:flex-row space-y-2 lg:space-y-0">
                              <div className="text-center lg:w-[70%] h-6 p-5 bg-white text-black max-lg:rounded-lg lg:rounded-l-lg flex items-center justify-center font-bold">
                                {currentOrder.items[index]?.key}
                              </div>
                              <button className="w-full lg:w-[30%] p-5 h-6 bg-[#F19D38] text-black text-center max-lg:rounded-lg lg:rounded-r-lg flex items-center justify-center font-bold">
                                REDEEM ON Platform
                              </button>
                            </div>
                            <span className="mt-2 font-light">
                              How Do I Redeem My Key?
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default Order;
