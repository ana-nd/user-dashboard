import React, { useState, useEffect } from "react";
import {
  Input,
  InputAdornment,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import "./Dashboard.css";
import { userData } from "../data";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [atozSort, setAtozSort] = useState(true);

  const handleUserStatus = (event, index) => {
    const _users = [...users];
    _users[index].isActive = event.target.checked;
    setUsers(_users);
  };

  useEffect(() => {
    setUsers(userData.sort((a, b) => a.name > b.name));
  }, []);

  useEffect(() => {
    if (searchText !== "") {
      const filteredUser = userData.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return setUsers(filteredUser);
    }
    if (atozSort) {
      const usersSortedAtoz = userData.sort((a, b) => a.name > b.name);
      setUsers(usersSortedAtoz);
    } else {
      const usersSortedZtoa = userData.sort((a, b) => a.name < b.name);
      setUsers(usersSortedZtoa);
    }
    setUsers(userData);
  }, [searchText, atozSort]);

  return (
    <div className="container">
      <h1 className="header">User Dashboard</h1>
      <div className="search-area">
        <Input
          autoFocus={false}
          placeholder="Search...."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" >
                <div onClick={() => setAtozSort(!atozSort)} className="sort-icon">
                  {atozSort ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}Name
                </div>
              </TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, idx) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {user.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: user.isActive ? "green" : "red" }}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    color="success"
                    checked={user.isActive}
                    onChange={(event) => handleUserStatus(event, idx)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
