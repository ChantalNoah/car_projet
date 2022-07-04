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



//import "./UpdateMark.css";


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

class UpdateMark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      id: props.location.state.id,
      data: {},
    };
     this.handleChangeProfile = this.handleChangeProfile.bind(this);
     this.updateMark = this.updateMark.bind(this);
     
    const history = this.props
    let profile;

    try {
      axios.get(
        `http://${REACT_APP_SERVER_URL}/api/mark/findByPk/${this.state.id}`,
      ).then((response)=>{
        profile= response;
        // console.log(profile);
        let loginRequestData = profile.data;
        if (profile.status === 200) {
        //   console.log('bonjour');
          this.setState({
            data: loginRequestData
          });
        } else {
        //   console.log(loginRequestData.error);
          this.setState({
            errorMessage: loginRequestData.error
          });
        }
      });
    } catch ({ error }) {
    //   console.log(error);
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
 

async updateStatut(e) {
  e.preventDefault();
 const { history } = this.props;

  let registerRequest;
  try {
    registerRequest = await axios.post(
      `http://${REACT_APP_SERVER_URL}/api/mark/update/${this.state.id}'}`,
      {
        ...this.state.data
      }
    );
  } catch ({ response }) {
    registerRequest = response;
  }
  const { data: registerRequestData } = registerRequest;

  if (registerRequest.status === 200) {
    return history.push("/admin/Mark");
  } else {
    // console.log(registerRequestData.error);
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
    const { classes, brand_name} = this.props;
    const { errors,data } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.updateMark}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Mark</h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete your Mark
                  </p>
                 
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={10}>
                      <TextField
                        id="brand_name"
                        name="brand_name"
                        label="nom de la marque"
                        type="text"
                        value={data.title}
                        defaultValue={"brand_name"}
                        onChange = {this.handleChangeProfile}
                      />
                     
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    Update Mark
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
UpdateMark.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string
};

export default withStyles(styles)(UpdateMark);