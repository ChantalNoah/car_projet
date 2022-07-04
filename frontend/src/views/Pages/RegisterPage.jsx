import React from "react";
import PropTypes, { string } from "prop-types";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Face from "@material-ui/icons/Face";
import Phone from "@material-ui/icons/Phone";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import registerPageStyle from "assets/jss/material-dashboard-react/views/registerPageStyle.jsx";

const { REACT_APP_SERVER_URL } = process.env;

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      role: "",
      checked: [],
      errors: {}
    };

    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this);
    const countries = ['jv', 'jj']
  }
  
  handleChange(event) {
    this.setState({role: event.target.value});
    console.log(event.target.value);
  }
  
  register = async e => {
    e.preventDefault();

    const { history } = this.props;

    const fields = ["firstname","email","lastname","number","num_cni","country","password", "role" ];
    const formElements = e.target.elements;

    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    let registerRequest;
    try {
      registerRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/api/user/create`,
        {
          ...formValues 
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.success) {
      return history.push("/auth/login-page");
    }else{
      console.log(registerRequestData.error);
      this.setState({
        errors:registerRequestData.error 
      });
      alert(registerRequestData.error)
    }

    
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
    const { errors } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.register}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>Register</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fa fa-facebook-square",
                      "fa fa-twitter",
                      "fa fa-google-plus"
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
                  <p className={classes.cardDescription}>Or Be Classical</p>
                  <CustomInput
                    labelText="First Name"
                    id="firstname"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      name: "firstname",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                    
                  />
                  <CustomInput
                    labelText="LastName"
                    id="lastname"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      name: "lastname",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                    
                  />
                   <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                 //   error={errors.e}
                    inputProps={{
                      required: true,
                      type: "email",
                      name: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Number"
                    id="number"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      type: string,
                    name: "number",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Phone className={classes.inputAdornmentIndIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Cni Number"
                    id="num_cni"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClass
                    }}
                   /// error={errors.username}
                    inputProps={{
                      required: true,
                      type: "string",
                      name: "num_cni",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAssignment} />
                        </InputAdornment>
                      )
                    }}
                  />
                   
                   <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClass
                    }}
                    inputProps={{
                      required: true,
                      type: "string",
                      name: "country",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAssignment} />
                        </InputAdornment>
                      )
                    }}
                  />
           
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    //error={errors.password}
                    inputProps={{
                      required: true,
                      name: "password",
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                    
                  />
                     
                    <label>
                      <select name="role" id="role" value={this.state.role} onChange={this.handleChange}>
                        <option value="PRESTATAIRE" selected={this.state.role == "PRESTATAIRE"? 'selected' : ''}>Prestataire</option>
                        <option value="CUSTOMER" selected={this.state.role == "CUSTOMER"? 'selected' : ''}>Customer</option>
                        
                      </select>
                    </label>
                                   
                  <FormControlLabel
                    classes={{
                      root:
                        classes.checkboxLabelControl +
                        " " +
                        classes.checkboxLabelControlClassName,
                      label: classes.checkboxLabel
                    }}
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => this.handleToggle(1)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        required
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    label={
                      <span>
                        I agree with the <a href="#pablo">Privacy Policy</a>.
                      </span>
                    }
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="primary" simple size="lg" block>
                    Let's Go
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(registerPageStyle)(RegisterPage);
