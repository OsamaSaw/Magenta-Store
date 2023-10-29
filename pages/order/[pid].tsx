import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ProductType } from "types";
import {
  FieldPath,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./../../firebase";
import { documentId } from "firebase/firestore";

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
    { id: "0dCNQ20DPpJ9t2VH7r3Y", key: "ada2s2d-asdasd-asdasd" },
    { id: "0v4PYcEHkWxSBH27hnhv", key: "a55dasd-as-55asdasd" },
  ],
};

const Order = ({ pid }: { pid: string }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const fetchProducts = async () => {
    // currentOrder.items.forEach(async (element) => {
    const q = query(
      collection(db, "ProgramDummyData"),
      where(
        documentId(),
        "in",
        currentOrder.items.map((item) => item.id)
      )
    );
    const querySnapshot = await getDocs(q);
    const newData: any = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    // console.log(newData);
    setProducts(newData);
    // });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex-1 bg-[#1c1c1c] pt-10">
      <span className="text-2xl text-white m-5">Order Details</span>
      <TableContainer
        sx={{
          backgroundColor: "#292929",
          width: "90%",
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
          width: "90%",
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
                  <>
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {<img className="w-20 h-20" src={item.image[0]} />}
                      </TableCell>
                      <TableCell align="left">
                        {
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span>platforms</span>
                          </div>
                        }
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex flex-col">
                          <div className="w-full flex flex-row">
                            <div className="text-center w-[75%] p-5 bg-white text-black">
                              {currentOrder.items[index].key}
                            </div>
                            <div className="w-[25%] p-5 bg-orange-400 text-center">
                              REDEEM ON Platform
                            </div>
                          </div>
                          <span>How Do I Redeem My Key?</span>
                        </div>
                      </TableCell>{" "}
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Order;
