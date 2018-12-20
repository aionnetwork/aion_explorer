/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker, DateRangeInput } from "@blueprintjs/datetime";

import moment from 'moment';
import { Button, Position, Classes, Popover, Menu, MenuItem, InputGroup, Intent, PopoverInteractionKind } from "@blueprintjs/core";

const SEARCH_DIR = {
  NONE: 0,
  FORWARD: 1,
  BACKWARD: 2,
}

export default class NCPagination extends Component
{
  constructor(props) {
    super(props);
    this.state = {start:null, end:null,startDate:null, endDate:null, rangeChange:true
    };
    this.loading = false;
    this.serchDirection = SEARCH_DIR.NONE;
  }

  componentDidMount() {
    
    //localStorage.getItem('p_size') && this.setState({'page_size':JSON.parse(localStorage.getItem('p_size'))});//this.state.page_size
   
  }

  handleRangeChange = (date) => {
    //console.log(date[0]);
    this.setState({
        start: date[0], end: date[1],rangeChange:false
      });
  }
  renderCalendarRange = () => {
    return (  
      <div>
        <DateRangeInput
          formatDate={date => date.toLocaleString()}
          onChange={this.handleRangeChange}
          parseDate={str => new Date(str)}
          value={[this.state.start, this.state.end]}
        />  
        <Button             
            className="pt-minimal " 
            text="Filter range"
            disabled={this.state.rangeChange}            
            onClick={() => {
              this.setState({
                rangeChange:true
              });
              let start = Math.round(new Date(this.state.start).getTime()/1000);
              let end = Math.round(new Date(this.state.end).getTime()/1000);
              console.log(end);
              this.setState({
                startDate:start,
                endDate:end
              });//this.state.startDate,this.state.endDate
              this.serchDirection = SEARCH_DIR.BACKWARD;
              this.props.onPageCallback(0,25, start, end);
            }}/>  
      </div>
    );
  }

  renderCalendarMenu = () => {
    return (
      <Menu className={"NCNavMenu"}>

        <MenuItem
          className="nav-option"
         
          text="Year"
        />
        <MenuItem
          className="nav-option"
          
          text="Month"
        />
        <MenuItem
          className="nav-option"
          
          text="Day"
        />
        <Button 
            
            className="pt-minimal right" 
            text="Submit"
            
            disabled={true}
            
            onClick={() => {
              this.serchDirection = SEARCH_DIR.FORWARD;
              this.props.onPageCallback(totalPages-1)
            }}/>
         
      </Menu>
    );
  }
   
  
  render() {
    
    // pageNumber is zero indexed
    let { calFilter=false, startDate, endDate, entityName, pageNumber, listSize, pageSize, totalPages, totalElements, onPageCallback, isLoading, isLatest=false } = this.props;
    //console.log(startDate+" "+endDate);
    let isFirstPage = (pageNumber + 1 == 1);
    let isLastPage = (pageNumber + 1 == totalPages );
    let val = pageNumber + 1;

    //console.log(calFilter);

    if (isLoading != this.loading) 
    {
      if (isLoading == true) {
        this.loading = true;
      } 
      if (isLoading == false) {
        this.loading = false;
        this.serchDirection = SEARCH_DIR.NONE;
      } 
    }

    console.log(entityName);
    
    return (
      <div className="NCPagination">
        <div className="row-count">
          <span className="pt-text-muted hide">
            {
              "Showing " + entityName + " " + 
              ((pageNumber * pageSize) + 1) + " - " + ((pageNumber * pageSize) + listSize) + 
              " of " + totalElements + (isLatest ? ((entityName!=="Contracts")&&(entityName!=="Tokens"))? "  for the last month" : "  for the last year" : " found")
            }
          {/*con*/}
          </span>
        </div>
      {
        (totalPages > 1) &&
        <div className="table-paging">
          {
            (calFilter!==false) &&
            <Popover
                
                content={this.renderCalendarRange()}
                interactionKind={PopoverInteractionKind.CLICK}
                position={Position.BOTTOM}>
                <Button 

                  className="text navbar-btn-active pt-button pt-minimal"
                  
                  iconName="pt-icon-calendar"            
                  className="pt-minimal" 
            
                  loading={(this.serchDirection == SEARCH_DIR.FORWARD && this.loading) ? true : false}

                  />          
            </Popover>
          }
          <Button 
            
            className="pt-minimal left" 
            text="First"
            
            disabled={isFirstPage || this.loading}
            loading={(this.serchDirection == SEARCH_DIR.BACKWARD && this.loading) ? true : false}
            
            onClick={() => {
              this.serchDirection = SEARCH_DIR.BACKWARD;
              this.props.onPageCallback(0,this.state.page_size,startDate,endDate);
            }}/>
            <Button 
            iconName="pt-icon-chevron-left" 
            className="pt-minimal left" 
            text="Prev"
            
            disabled={isFirstPage || this.loading}
            loading={(this.serchDirection == SEARCH_DIR.BACKWARD && this.loading) ? true : false}
            
            onClick={() => {
              this.serchDirection = SEARCH_DIR.BACKWARD;
              this.props.onPageCallback(pageNumber - 1,this.state.page_size,startDate,endDate);
            }}/>
          
          <span className="pt-text-muted context">
            { "Page " }
          </span>
             <InputGroup 
              type="number" 
              onChange={(e) => {
                this.serchDirection = SEARCH_DIR.FORWARD;

                console.log(totalElements);
                console.log(parseInt(e.target.value)-1);

                if((parseInt(e.target.value)-1)<totalPages){

                  this.props.onPageCallback(parseInt(e.target.value)-1,pageSize,startDate,endDate);

                }

                
                }} 

               className="paging-input"
              value = {parseInt(pageNumber+1)}
               />
          <span className="pt-text-muted context hide">    
            { " of " + totalPages}
          </span>
          <Button 
            rightIconName="pt-icon-chevron-right" 
            className="pt-minimal right" 
            text="Next"
            
            disabled={isLastPage || this.loading}
            loading={(this.serchDirection == SEARCH_DIR.FORWARD && this.loading) ? true : false}

            onClick={() => {
              this.serchDirection = SEARCH_DIR.FORWARD;
              this.props.onPageCallback(pageNumber + 1,pageSize,startDate,endDate)
            }}/>
            <Button 
            
            className="pt-minimal right" 
            text="Last"
            
            disabled={isLastPage || this.loading}
            loading={(this.serchDirection == SEARCH_DIR.FORWARD && this.loading) ? true : false}

            onClick={() => {
              this.serchDirection = SEARCH_DIR.FORWARD;
              this.props.onPageCallback(totalPages-1,pageSize,startDate,endDate)
            }}/>
            
            
        </div>
      }
      </div>
    );
  }
}






















































