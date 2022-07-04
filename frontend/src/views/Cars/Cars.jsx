import React from "react";
import {useState, useEffect} from "react";

import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//import Table from "components/Table/Table.jsx";
import {  Grid, Button,Table,TableHead,TableRow,TableBody,TableCell,Switch  } from "@material-ui/core";
import { Link } from 'react-router-dom' 

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Delete from '@material-ui/icons/Delete';
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
    background: "linear-gradient(60deg, #0dcaf0, #0d6efd)",
    color: "#FFFFFF",
    float: "right",
  },
  tb_image: {
    height: "50px",
    width: "auto",
    boxShadow: "1px 5px 6px -1px rgba(0,0,0,0.48)"
  }
};


function Cars(props) {
  const { classes } = props;
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

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
  
 async function getData() {
    const listRequest= await axios.get(
        `http://${REACT_APP_SERVER_URL}/api/car/findAll`
      );
    console.log(listRequest);
    if (listRequest.status === 200) {
      console.log(listRequest.data);
      setData(listRequest.data);
      setLoadingData(false);

    } 
  };

useEffect(() => {
  if(loadingData) {
    getData();
  }
})
console.log(localStorage.getItem('userToken'))
console.log(localStorage.getItem('userData'))
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} m={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.carTitleWhite}>Liste des voitures</h4>
          </CardHeader>
          <CardBody>
            <Link to={{pathname:`/admin/Carsregister`,}}> 
              <Button className={classes.buttonStyle} > Nouvelle voiture</Button>
            </Link>
                     
          
                <Table aria-label="simple table" stickyHeaer>
                  <TableHead>
                    <TableRow>
                      <TableCell>Propriétaire</TableCell>
                      <TableCell align="center">Immatriculation</TableCell>
                      <TableCell align="center">Modèle</TableCell>
                       <TableCell align="center">Image</TableCell>
                       <TableCell align="center">Actions</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displaydata.map((row) => (
                      <TableRow key={row.i}>
                         
                        <TableCell component="th" scope="row">
                          {row.users.firstname} 
                        </TableCell>
                        <TableCell align="center">{row.num_imatriculation}</TableCell>
                        <TableCell align="center">{row. carmodels.model_name}</TableCell>
                        <TableCell align="center">
								              	<img src={'http://'+ REACT_APP_SERVER_URL + '/image/' + row.image } className={classes.tb_image} /></TableCell>
                                
                        <TableCell align="right">
                           

                        <Link to={{pathname:`/admin/Carshow/${row.id}`, state: { id: row.id}}}>                             
                               <Button  className={classes.button}  >
                                <Eyes/> 
                              </Button>
                            </Link>
                            <Link to={{pathname:`/admin/updatcar/${row.id}`, state: { id: row.id}}}>                             
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

export default withStyles(styles)(Cars);





