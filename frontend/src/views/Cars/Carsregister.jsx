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
import { Select, MenuItem,TextField } from "@material-ui/core";
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

import CarregisterStyle from "assets/jss/material-dashboard-react/views/CarregisterStyle.jsx";

import Autocomplete from "react-google-autocomplete";


const auth = require('./../../middleware/Auth.middleware');
const { REACT_APP_SERVER_URL } = process.env;
const { YOUR_GOOGLE_MAPS_API_KEY } = process.env;

class Carsregister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: {},
      Carmodel: [],
      CarmodelList: [],
      carmodel: {},
      User: [],
      UserList: [],
      userid: {},
      selectedFile: undefined,
      formlongitude: '',
      formlatitude: ''

    };
   
    this.car = this.car.bind(this);
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChangeCarmodel = this.handleChangeCarmodel.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.selectFile = this.selectFile.bind(this);

  }
  handleChangeCarmodel(event) {
    console.log(event.target.value);
    this.setState({ carmodel: event.target.value });
  }
  handleChangeUser(event) {
    console.log(event.target.value);
    this.setState({ userid: event.target.value });

  }

  selectFile(e) {
    console.log("SELECTED FILEE", e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] });
    
  }

  car = async e => {
    e.preventDefault();
    console.log("seleeeeeccteeddfillle",this.state.selectedFile);
    const { history } = this.props;
    const fields = ["num_imatriculation", "nb_places", "price_day", "price_hour", "assurance", "thumbnail", "availability","latitude_start","longitude_start"];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));
    console.log(formValues);

    let formData = new FormData();
    formData.append("file", this.state.selectedFile);

    for (let key in formValues) {
      formData.append(key, formValues[key]);
    }

    formData.append("UserId", this.state.userid);
    formData.append("CarModelId", this.state.carmodel)

    let registerRequest;
    try {
      console.log(formValues);
      registerRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/api/car/create`, formData
        // Redirection
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    console.log(registerRequest);
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.success) {
      return history.push("/admin/car");
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
  handleChange2 = address => {
    this.setState({ address });
  };
  handleSelect = address => {
    console.log(address.geometry.location.lat(),address.geometry.location.lng());
    this.setState({
      formlatitude:address.geometry.location.lat(),
      formlongitude:address.geometry.location.lng(),
        });
        
  };


  async carsData() {
    const response = await axios.get(`http://${REACT_APP_SERVER_URL}/api/carmodel/findAll`);
    if (response.status === 200) {
      console.log(response.data);
      this.setState({
        CarmodelList: response.data
      });

    }
    const response2 = await axios.get(`http://${REACT_APP_SERVER_URL}/api/user/findAll`);
    if (response2.status === 200) {
      console.log(response2.data);
      this.setState({
        UserList: response2.data
      });

    }
  }

  componentDidMount() {
    console.log('ok');
    this.carsData();
  };

  componentDidMount() {
    console.log('ok');
    this.carsData();
  };

  render() {
    const { classes } = this.props;
    const { errors, CarmodelList, UserList,formlatitude } = this.state;

    return (
      <div className={classes.container}>
        <GridContainer justify="align">
          <GridItem xs={16} sm={10} md={10}>
            <form onSubmit={this.car}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>register your car</h4>
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
                    labelText="Immatriculation"
                    id="num_imatriculation"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      type: "string",
                      name: "num_imatriculation",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}

                  />
                  <CustomInput
                    labelText="Places"
                    id="nb_places"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      type: "string",
                      name: "nb_places",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}

                  />
                  <CustomInput
                    labelText="Price Day"
                    id="price_day"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    //   error={errors.e}
                    inputProps={{
                      required: true,
                      type: "price",
                      name: "price_day",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Price hour"
                    id="price_hour"
                    formControlProps={{
                      fullWidth: true,
                      classNumber: classes.formControlClassNumber
                    }}
                    inputProps={{
                      required: true,
                      type: "price",
                      name: "price_hour",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Assurance"
                    id="assurance"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    /// error={errors.username}
                    inputProps={{
                      required: true,
                      type: "text",
                      name: "assurance",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Thumbnail"
                    id="thumbnail"
                    formControlProps={{
                      fullWidth: true,
                      classRole: classes.formControlClass
                    }}

                    inputProps={{
                      required: true,
                      type: "text",
                      name: "thumbnail",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Availability"
                    id="availability"
                    formControlProps={{
                      fullWidth: true,
                      classRole: classes.formControlClass
                    }}
                    // error={errors.username}
                    inputProps={{
                      required: true,
                      type: "text",
                      name: "availability",
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      )
                    }}
                  />
                     <Autocomplete 
                    apiKey={YOUR_GOOGLE_MAPS_API_KEY}
                    style={{width: "90%"}}
                    onPlaceSelected={(place)=>{
                      this.handleSelect(place);
                    }}
                    />
                    <TextField
                    name="latitude_start"
                    type="text"
                    value={this.state.formlatitude}
                    />

            <Autocomplete 
                    apiKey={YOUR_GOOGLE_MAPS_API_KEY}
                    style={{width: "90%"}}
                    onPlaceSelected={(place)=>{
                      this.handleSelect(place);
                    }}
                    />
                    <TextField
                    name="longitude_start"
                    type="text"
                    value={this.state.formlongitude}
                    />
          
                 
              <div>
                <input type="file" onChange={this.selectFile} />
             </div>
                  
                  <div className="mt-2">
                    <select  className ="form-select" labelId="carmodel"
                      id="CarModelId"
                      name="CarModelId"
                      onChange={this.handleChangeCarmodel}
                      >

                      <option value="">choisir un model</option>
                      {
                        CarmodelList.map((val, index) => {
                          return <option value={val.id}>
                            {val.model_name}
                            {val.marks.brand_name}</option>
                        })
                      }
                    </select>
                  </div>

                  <div className="mt-2">
                    <select  className ="form-select" labelId="role-lbl"
                      id="newRole"
                      name="UserId"
                      onChange={this.handleChangeUser}
                      >

                      <option value="">choisir un utilisateur</option>
                      {
                        UserList.map((val, index) => {
                          return <option value={val.id}>
                            {val.firstname}
                            {val.role}</option>
                        })
                      }
                    </select>
                  </div>

                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="primary" simple size="lg" block>
                    validate
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

Carsregister.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(CarregisterStyle)(Carsregister);
