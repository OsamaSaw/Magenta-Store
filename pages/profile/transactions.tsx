import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

const rows = [
  {
    id: "1",
    date: "Jun 10,2022",
    items: ["Mystery vault", "fallout 4"],
    status: "complete",
    action: "",
  },
  {
    id: "2",
    date: "Jun 10,2022",
    items: ["Anti-virus"],
    status: "complete",
    action: "",
  },
  {
    id: "3",
    date: "Jun 10,2022",
    items: ["Norton", "malwarebytes"],
    status: "complete",
    action: "",
  },
  {
    id: "4",
    date: "Jun 10,2022",
    items: ["Mystery vault", "fallout 4"],
    status: "complete",
    action: "",
  },
];

export const Transactions = ({}: {}) => {
  return (
    <section className="w-[75%] mr-auto ml-auto">
      <span className="text-2xl text-white">Order history</span>
      {/* <div className="searchBox">
        <input
          style={{
            width: "100%",
            alignSelf: "center",
            color: "black",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
        <div className="searchButton">
          <i
            // onClick={() => setSearchOpen(!searchOpen)}
            className="icon-search"
          ></i>
        </div>
      </div> */}
      <TableContainer
        id="myTable"
        sx={{
          backgroundColor: "#292929",
          marginLeft: "auto",
          marginRight: "auto",
          marginY: "10px",
        }}
        component={Paper}
      >
        <Table sx={{ backgroundColor: "#292929" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>DATE</TableCell>
              <TableCell align="left">ITEMS</TableCell>
              <TableCell align="left">STATUS</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell align="left">
                  <div className="flex flex-col">
                    {row.items.map((item) => {
                      return <span>{item}</span>;
                    })}
                  </div>
                </TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="center">
                  <Link className="text-[#F19D38]" href={`/order/${row.id}`}>
                    View order and keys
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
