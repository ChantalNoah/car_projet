import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";



//import "./TableProfile.css";


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

class tablereservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      id: props.location.state.id,
      data: {},
      user: {}
    };
    console.log(props);
     this.handleChangeProfile = this.handleChangeProfile.bind(this);
     this.updateUseur = this.updateUseur.bind(this);
     
    const history = this.props
    let profile;
    // console.log(data)

    try {
      axios.get(
        `http://${REACT_APP_SERVER_URL}/api/reservation/findByPk/${this.state.id}`,
      ).then((response)=>{
        profile = response;
        console.log(profile);
        let loginRequestData = profile.data;
        if (profile.status === 200) {
          console.log('bonjour');
          console.log(loginRequestData.users);
          this.setState({
            data: loginRequestData
          });
          this.setState({
            user: this.state.data.users
          });
        } else {
          console.log(loginRequestData.error);
          this.setState({
            errorMessage: loginRequestData.error
          });
        }
      });
    } catch ({ error }) {
      console.log(error);
      profile = error;
    }
  }

  //fonction decriture et de supression dans le formilaire
 handleChangeProfile = e => {
  this.setState({
    data: {
      ...this.state.data,
      [e.target.name]: e.target.value,
    }
  });
}
 

async updateUseur(e) {
  e.preventDefault();
 const { history } = this.props;

  let registerRequest;
  try {
    registerRequest = await axios.post(
      `http://${REACT_APP_SERVER_URL}/api/reservation/update/${this.state.id}'}`,
      {
        ...this.state.data
      }
    );
  } catch ({ response }) {
    registerRequest = response;
  }
  const { data: registerRequestData } = registerRequest;

  if (registerRequest.status === 200) {
    return history.push("/admin/Reservation");
  } else {
    console.log(registerRequestData.error);
    this.setState({
      errorMessage: registerRequestData.error
    });
  }

  return false;
}

handleChange = e => { 
this.setState({
   data: {
    ...this.state.data,
     [e.target.name]: e.target.value,
  }
});
};

  render() {
    const { classes, start, end,amount_res,payement_mode} = this.props;
    const { errors,data,user } = this.state;
    console.log(data);
    console.log(user);
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.updateUseur}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Resevation</h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete your reservation
                  </p>
                 
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <TextField
                        id="start"
                        name="start"
                        label="Start"
                        type="date"
                        value={data.start}
                        defaultValue={"start"}
                        onChange = {this.handleChangeProfile}
                      />
                      <TextField
                        id="end"
                        name="end"
                        label="End"
                        type="date"
                        value={data.end}
                        defaultValue={"end"}
                        onChange = {this.handleChangeProfile}
                      />
                      <TextField
                        id="amount_res"
                        name="amount_res"
                        label="Amount reservation"
                        type="price"
                        value={data.amount_res}
                        defaultValue={"amount_res"}
                        onChange = {this.handleChangeProfile}
                      />
                    <TextField
                        id="payement_mode"
                        name="payement_mode"
                        label="Payement mode"
                        type="string"
                        value={data.payement_mode}
                        defaultValue={"nupayement_modember"}
                        onChange = {this.handleChangeProfile}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    Update reservation
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
          
        </GridContainer>
      </div>
    );
  }
}

tablereservation.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string
};

export default withStyles(styles)(tablereservation);