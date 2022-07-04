import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Delete from '@material-ui/icons/Delete';


// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { Link } from 'react-router-dom'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const { REACT_APP_SERVER_URL } = process.env;

class Showreservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      id: props.location.state.id,
      data: {},
    };
    const history = this.props
    let reservation;

    try {
      axios.get(
        `http://${REACT_APP_SERVER_URL}/api/reservation/findByPk/${this.state.id}`,
      ).then((response)=>{
        reservation = response;
        let loginRequestData = reservation.data;
        if (reservation.status === 200) {
          this.setState({
            data: loginRequestData
          });
        } else {
          this.setState({
            errorMessage: loginRequestData.error
          });
        }
      });
    } catch ({ error }) {
      reservation = error;
    }
  }

  deleteUser(id)
  {

  fetch(`http://${REACT_APP_SERVER_URL}/api/reservation/delete/`+id,
  {
    method: 'DELETE'
  }).then((result)=>{
    result.json().then((resp)=>{
      // return history.push("/reservation/list")
    })
  })
}
  
  deleteModal(id){
    let nom = prompt("Delete this item ?");
    if (nom === "Yes") {
      this.deleteUser(id)
      window.history.back() 
    }
  }
  render() {
    const { classes,start,end,amount_res,payement_mode,latitude_start,arrival_longitude, longitude_start,arrival_latitude} = this.props;
    const { errors,data } = this.state;
    console.log(data)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>reservation : {data.firstname}</h4>
                </CardHeader>
                <Link to={{pathname:`/admin/Reservation`}}> 
            <Button className={classes.buttonStyle} color="primary" variant="rounded"> RETOUR</Button>
          </Link>
               
                
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={10}>
                      <div className="container">
                        <div>
                        <table className="table table-striped table-hover">
                            <thead>
                              <tr className="table-active">
                                <th colSpan={2}>Informations</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="card-text white-text mb-4">Start:</td>
                                <td>{ data.start }</td>
                              </tr>
                              <tr>
                                <td className="card-text white-text mb-4">End:</td>
                                <td>{ data.end }</td>
                              </tr>
                              <tr>
                                <td className="card-text white-text mb-4">Amount reservation:</td>
                                <td>{ data.amount_res }</td>
                              </tr>

                              <tr>
                                <td className="card-text white-text mb-4">Payement mode:</td>
                                <td>{ data.payement_mode }</td>
                              </tr>

                              <tr>
                                <td className="card-text white-text mb-4">Statut:</td>
                                <td>{ data.statut }</td>
                              </tr>

                            
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                <Button  onClick={() => this.deleteModal(this.state.id)}>
                  <Delete/>
                </Button>
                </CardFooter>
              </Card>
          </GridItem>
          
        </GridContainer>
      </div>
    );
  }
}

Showreservation.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string
};

export default withStyles(styles)(Showreservation);