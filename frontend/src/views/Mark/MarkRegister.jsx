import React from "react";
import { useEffect } from "react";
import PropTypes, { string } from "prop-types";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Select,MenuItem } from "@material-ui/core";
import { useState, } from "react";


// @material-ui/icons



// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import reservationregisterStyle from "assets/jss/material-dashboard-react/views/reservationregisterStyle.jsx";

const { REACT_APP_SERVER_URL } = process.env;

class MarkRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: {},
    
    };
   this.reservation = this.reservation.bind(this);
  }
  
  reservation = async e => {
    e.preventDefault();
    const { history } = this.props;
    const fields = ["brand_name"];
    const formElements = e.target.elements;
    console.log(formElements);
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));
    let registerRequest;
    try {
      registerRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/api/mark/create`,
        {
          ...formValues 
        }
        // Redirection
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    console.log(registerRequest);
    const { data: registerRequestData } = registerRequest;
    if (registerRequest.status == 200) {
      return history.push("/admin/Mark");
    }

    this.setState({
      errors:
        registerRequestData.messages && registerRequestData.messages.errors
    });
  };

  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  


  render() {
    const { classes } = this.props;
    const { errors,marksList } = this.state;
    console.log(marksList);
    return (
      <div className={classes.container}>
        <GridContainer justify="align">
          <GridItem xs={16} sm={10} md={10}>
            <form onSubmit={this.reservation}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>enregistrer une marque</h4>
                  <div className={classes.socialLine}>
                    {[
                      
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardBody>
                 
                  <CustomInput
                    labelText="nom de marque"
                    id="brand_name"
                    formControlProps={{
                      fullWidth: true,
                      classRole: classes.formControlClass
                    }}
                   // error={errors.username}
                    inputProps={{
                      required: true,
                      type: "string",
                      name: "brand_name",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}
                  />

                  
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                <Button type="submit" color="primary" simple size="lg" block>
                    Let's Go
                  </Button>
                  <Button type="reset" color="primary" simple size="lg" block>
                  Cancel
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

MarkRegister.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles( reservationregisterStyle)(MarkRegister);
