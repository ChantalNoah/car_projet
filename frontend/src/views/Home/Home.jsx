import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import HomeStyle from "assets/jss/material-dashboard-react/views/HomeStyle.jsx";




class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: {}
    };
  }

  render() {
    const { classes } = this.props;
   
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <h1>Hello</h1>
            
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}



export default withStyles(HomeStyle)(Home);