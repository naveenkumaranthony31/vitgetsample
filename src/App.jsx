import React from 'react';
import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const [product,setProduct]=useState([])
  const [search,setSearch]=useState("")
  const getDataProduct=async () => {
    try {
      const data=await axios.get("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      console.log(data.data);
      setProduct(data.data)
      
    }
    catch(e){
      console.log(e);
      
    }
  }
useEffect(()=>{
getDataProduct()
},[])
  return (
   <div>
    <h1>hi</h1>
    <input 
    type="text"
    placeholder='search here'
    onChange={(e)=>{
      setSearch(e.target.value);
    }} />
    

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="right">Product Price</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {
      product.filter(item=>{
        if(search ==""){
          return item;
        }
        else if(item.name.toLowerCase().includes(search.toLocaleLowerCase())){
          return item;
        }
      })
      
      .map((item)=>{
return(
  <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.price}</StyledTableCell>
             
            </StyledTableRow>
)
      })
    }
        
        </TableBody>
      </Table>
    </TableContainer>

   </div>
  )
}

export default App
