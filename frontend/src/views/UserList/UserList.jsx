import React from "react";
import {useState, useEffect} from "react";

import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//import Table from "components/Table/Table.jsx";
import {Button,Table,TableHead,TableRow,TableBody,TableCell} from "@material-ui/core";
import { Link } from 'react-router-dom' 

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Edit from "@material-ui/icons/Edit";
import Eyes from "@material-ui/icons/Book";

import ReactPaginate from 'react-paginate'

const { REACT_APP_SERVER_URL } = process.env;

const styles = {
	carCategoryWhite: {
		"&,& a,& a:hover,& a:focus": {
			color: "rgba(255,255,255,.62)",
			margin: "0",
			fontSize: "14px",
			marginTop: "0",
			marginBottom: "0"
		},
		"& a,& a:hover,& a:focus": {
			color: "#FFFFFF"
		}
	},
	carTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textecoration: "none",
		"& small": {
			color: "#777",
			fontSize: "65%",
			fontWeight: "400",
			lineHeight: "1"
		}
	},
  buttonStyle: {
    background: "linear-gradient(#0dcaf0, #0d6efd, #0d6efd)",
    color: "#FFFFFF",
    float: "right",
  }
};


function UserList(props) {
	const { classes } = props;
	const [loadingData, setLoadingData] = useState(true);
	const [data, setData] = useState([]);
  const [add, setAdd] = useState([])

	// Paginate 
	const [page, setPage] = useState(0)
	const dataPerPage = 5
	const numberOfataVisite = page * dataPerPage

	const changePage = ({ selected }) => {
		setPage(selected)
	}
	let displaydata;
	let totalPages;

	if(data) {
		displaydata = data.slice(numberOfataVisite, numberOfataVisite + dataPerPage);
		totalPages = Math.ceil(data.length / dataPerPage);
	}
  // En paginate
  
  let request = props.location.search;
 
 async function getData() {
    const listRequest= await axios.get(
        `http://${REACT_APP_SERVER_URL}/api/user/findAll`
      );
    if (listRequest.status === 200) {
      setData(listRequest.data);
      setLoadingData(false);
      let count = true
      if (request && count) {
        alert("User has been register with succesfuly")
        count = false
      }
    }
  };

useEffect(() => {
  if(loadingData) {
    getData();
  }
})

  return (
   
    <GridContainer>
      <GridItem xs={12} sm={12} m={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.carTitleWhite}>Liste des utilisateurs</h4>
          </CardHeader>
          <CardBody>
          <Link to={{pathname:`/admin/Userregister`}}> 
            <Button className={classes.buttonStyle} > Nouvel utilisateur</Button>
          </Link>
                <Table aria-label="simple table" stickyHeaer>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell align="center">Numéro de téléphone</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Pays</TableCell>
                       <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displaydata.map((row) => (
                      <TableRow key={row.i}>
                        <TableCell component="th" scope="row">
                          {row.firstname} 
                        </TableCell>
                        <TableCell align="center">{row.number}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center"> {row.country}  </TableCell>
                        <TableCell align="right">

                        	<Link to={{pathname:`/admin/Show/${row.id}`, state: { id: row.id}}}>                             
                               <Button  className={classes.button}  >
                                <Eyes/> 
                              </Button>
                            </Link>
                            
							                <Link to={{pathname:`/admin/Table/${row.id}`, state: { id: row.id}}}>                             
                              <Button  className={classes.button}  >
                                <Edit/> 
                              </Button>
                            </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              
              
          </CardBody>
        </Card>
      </GridItem>

      <ReactPaginate 
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={"navigationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        isableClassName={"navigationisable"}
        activeClassName={"navigationActive"}
      />
    </GridContainer>

  );

}

export default withStyles(styles)(UserList);
