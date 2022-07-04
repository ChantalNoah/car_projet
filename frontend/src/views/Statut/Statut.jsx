
import React from "react";
import {useState, useEffect} from "react";

import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//import Table from "components/Table/Table.jsx";
import { Grid, Button,Table,TableHead,TableRow,TableBody,TableCell,Switch  } from "@material-ui/core";
import { Link } from 'react-router-dom'

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Delete from '@material-ui/icons/Delete';
import Edit from "@material-ui/icons/Edit";

import ReactPaginate from 'react-paginate'

const { REACT_APP_SERVER_URL } = process.env;

const styles = {
  cardCategoryWhite: {
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
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
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
  }
};


function Statut(props) {
  const { classes } = props;
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  // Paginate 
  const [page, setPage] = useState(0)
  const dataPerPage = 5
  const numberOfDataVisited = page * dataPerPage
  const changePage = ({ selected }) => {
    setPage(selected)
  }

let displayData;
let totalPages;

if( data ) {
   displayData = data.slice(numberOfDataVisited, numberOfDataVisited + dataPerPage) 
   totalPages = Math.ceil(data.length / dataPerPage)

}

  // End paginate
  
 async function getData() {

    const listRequest= await axios.get(
        `http://${REACT_APP_SERVER_URL}/api/statut/findAll`
      );
    console.log(listRequest);
    if (listRequest.status === 200) {
      setData(listRequest.data);
      setLoadingData(false);
    }
  };
  

useEffect(() => {
  if(loadingData) {
    getData();
  }
})

function deleteStatut(id)

{

  fetch(`http://${REACT_APP_SERVER_URL}/api/statut/delete/`+id,
  {
    method: 'DELETE'
  }).then((result)=>{
    result.json().then((resp)=>{
      console.warn(resp);
      getData();
    })
  })
    console.log(id)
;
}
function Modaledelete(id)
{
  
  if (prompt("are you sure?" ) === "Yes"){
    deleteStatut(id)
  }
}
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des statuts</h4>
          </CardHeader>
          <CardBody>
            <Link to={{pathname:`/admin/StatutRegister`,}}> 
              <Button className={classes.buttonStyle} > Nouveau statut</Button>
            </Link>
          {loadingData ? (
                <p>Loading Please wait...</p>
                ) : (
                          
          
                <Table aria-label="simple table" stickyHeader>
                  <TableHead>
                    <TableRow>
                     
                       <TableCell>Description</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayData.map((row) => (
                      <TableRow key={row.id}>
                        
                       <TableCell >{row.description}</TableCell>
                        
                        <TableCell >
                            <Button  onClick={() => Modaledelete(row.id)} >
                              <Delete/> 
                            </Button>


                          <Link to={{pathname:`/admin/UpdateStatut/${row.id}`, state: { id: row.id}}}>                            
                           <Button  className={classes.button}  >
                              <Edit/> 
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              
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
        disabledClassName={"navigationDisabled"}
        activeClassName={"navigationActive"}
      />
    </GridContainer>

  );

}

export default withStyles(styles)(Statut);


