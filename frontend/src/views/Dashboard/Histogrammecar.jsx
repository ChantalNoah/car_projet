import React, { Component, useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Taxi from "@material-ui/icons/LocalTaxi";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import DataTable from "react-data-table-component-extensions";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import UserList from "views/test/RegisterOne.jsx";

//import jsonData from './data.json';
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;
var Chartist = require("chartist");

function Histogrammecar({classes}) {
  const [data, setData] = useState([]);
  const [groupBy, setGroupBy] = useState("day");
  const [daily, setDaily] = useState([])
  // const [loadingData, setLoadingData] = useState;

  /* const [intervalFormats, setMyMap] = useState(new Map([
  ['week', 'YYYY-ww'],
  ['month', 'YYYY-MM'],
  ['quarter', 'YYYY-Q'],
  ['year', 'YYYY']
])); */

  const intervalFormats = new Map([
    ["day", "YYYY-MM-DD"],
    ["week", "YYYY-ww"],
    ["month", "YYYY-MM"],
    ["quarter", "YYYY-Q"],
    ["year", "YYYY"],
  ]);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  /*  async function getData() {
   
    setData (jsonData);
  
 /*  const resp = await axios.get(
    `http://${REACT_APP_SERVER_URL}/api/ride/show`
  );
  //console.log(resp.data);
  if (resp.status === 200) {
    setData(resp.data);

    //setData(response.data.rows);
    setLoadingData(false);
  } 
} */
  function handleGroupByChange(event) {
    const groupBy = event.target.value;
    setGroupBy(groupBy);
  }

  async function getData() {
    // setData (jsonData);

    const resp = await axios.get(
      `http://${REACT_APP_SERVER_URL}/api/user/list-users`
    );
    console.log(resp);
    if (resp.status === 200) {
      setData(resp.data.users);
      //const data1 = resp.data.map((item => days[new Date(item.createdAt).getDay()]));
      setDaily(resp.data.Values);
      
    }
  }
  
  useEffect(() => {

    getData();    
    
  }, []);

  console.log(data);
  console.log(daily);
/* 
  function countOccurences(tab){
    var result = {};
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    tab.forEach(function(elem){
      if(elem in result){
        result[elem] = ++result[elem];
      }
      else{
        result[elem] = 1;
      }
    });
    return result;
  }
const tab = daily;
console.log(tab); */


  const Values = daily;


  const getDataWithIntervalAsDate = () => {
    return data.map((item) => ({
      ...item,
      date: moment(item.createdAt).format(
        intervalFormats.get(groupBy ? groupBy : "day"),
      
      
      ),
    }));
  };

  

  const groupDataByInterval = () => {
    const dataWithIntervalAsDate = intervalFormats.has(groupBy)
      ? getDataWithIntervalAsDate()
      : data;
    
    const intervals = [
      ...new Set(dataWithIntervalAsDate.map((item) => item.date)),
    ];

    console.log (dataWithIntervalAsDate);

   //const day = d.getDay();
    return intervals.map((interval) => {
      const filteredData = dataWithIntervalAsDate.filter(
        (item) => item.date === interval
      );
      
      //const daysOfWeek = dataWithIntervalAsDate.
      /*  const dayData = () => {return intervals.map(item => (
      item.date
      ))}
      const dayDataData = dayData();
      console.log(dayDataData); */
     
      console.log(filteredData);
      return {
       
        date: interval,
        value: filteredData.reduce((sum, item) => sum + 1, 0),
      };
    });
  };



// ##############################
// // // variables used to create animation on charts
// #############################
  var delays = 80,
  durations = 500;
  var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

  const dailySalesChart =  {
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [Values]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };

  /* 
  const d = new Date();
  let day = days[d.getDay()];
  console.log(day);
 */
  const groupData = () => {
    if (groupBy === "") {
      return data;
    }

    return groupDataByInterval();
  };

  const groupedData = groupData();
  console.log(groupedData);
  return (
    <div className="App" style={{ padding: "20px" }}>
      <div className="GroupBySelect">
        <label>Group By: </label>
        <select
          defaultValue={groupBy}
          onChange={handleGroupByChange}
          style={{ padding: "5px", marginLeft: "5px" }}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="quarter">Quarter</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="Output" style={{ marginTop: "20px" }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td style={{ textAlign: "right" }}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          </GridContainer>
    </div>
    
    
  );
}

Histogrammecar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Histogrammecar);