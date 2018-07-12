/* eslint-disable */
import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux';

import {BigNumber} from 'bignumber.js'
import moment from "moment";
import { Menu, MenuItem, Position, Classes, InputGroup, Popover, Button, PopoverInteractionKind, Spinner, Tooltip, MenuDivider } from "@blueprintjs/core";

import { ncNetwork_pollForKpiList, ncNetwork_pollForStaticInfo } from 'network/NCNetwork';

import NCLivenessIndicator from 'components/layout/NCLivenessIndicator';
import NCTopLevelSearch from 'components/layout/NCTopLevelSearch';
import NCLoading from 'components/common/NCLoading';

import { NCNETWORK_REQUESTS_ENABLED } from 'network/NCNetwork';

import { NCEntity, NCEntityInfo } from 'lib/NCEnums';
import { disconnectSocket } from 'network/NCNetwork';
import * as network from 'network/NCNetworkRequests';

import appConfig from '../../../config.json';

class NCLayout extends Component {

  constructor(props) {
    super(props);

    this.connectionMenu = 
    <Button 
      className="navbar-btn-active pt-button pt-minimal"
      text="Explorer"/>;  

    let networkList = appConfig.network_list;
      
    // figure out document title -----------------------------------------------

    let documentTitle = "Aion | Explorer";

    if (networkList && networkList[0] && networkList[0].name)
      documentTitle = "Aion | "+networkList[0].name;

    document.title = documentTitle; 

    // figure out the menu items -----------------------------------------------

    if (networkList && networkList[0].name) {
      this.connectionMenu = 
        <Button 
          className="navbar-btn-active pt-button pt-minimal"
          text={networkList[0].name}/>; 
    }

    if(Array.isArray(networkList) && networkList.length > 1) {
      let menuItemList = [];
      networkList.forEach((v, i) => {
        if (i > 0) {
          if (v.name && v.url) {
            menuItemList.push(<MenuItem
              key={i}
              className="nav-option"
              onClick={() => window.open(v.url)}
              text={v.name}/>);
          }
        }
      });

      if (menuItemList.length > 0) {
        this.connectionMenu = 
        <Popover
          content={
            <Menu className="NCNavMenu">
              <MenuDivider title="Switch Network" />
              { menuItemList }
            </Menu>
          }
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_RIGHT}>
            <Button 
              className="navbar-btn-active pt-button pt-minimal"
              rightIconName="pt-icon-caret-down"
              text={networkList[0].name ? networkList[0].name : "Explorer"}/>  
        </Popover>
      }   
    }         
  }

  componentWillMount() {
    network.getDashboardData();
  }

  componentWillUnmount() {
    disconnectSocket();
  };

  renderExplorerMenu = () => {
    return (
      <Menu className="NCNavMenu">
        <MenuItem
          className="nav-option"
          iconName={NCEntityInfo[NCEntity.BLOCK].icon}
          onClick={() => {
            hashHistory.push('/blocks');
          }}
          text="Blocks"
        />
        <MenuItem
          className="nav-option"
          iconName={NCEntityInfo[NCEntity.TXN].icon}
          onClick={() => {
            hashHistory.push('/transactions');
          }}
          text="Transactions"
        />
        <MenuItem
          className="nav-option"
          iconName={NCEntityInfo[NCEntity.ACCOUNT].icon}
          onClick={() => {
            hashHistory.push('/accounts');
          }}
          text="Accounts"
        />
      </Menu>
    );
  }

  renderConnectionMenu = () => {
    return (
      <Menu className="NCNavMenu">
        <MenuDivider title="Switch Network" />
        <MenuItem
          className="nav-option"
          onClick={() => window.open("https://mainnet.aion.network")}
          text="Mainnet Kilimanjaro"/>
        <MenuItem
          className="nav-option"
          onClick={() => window.open("https://testnet2.aion.network")}
          text="Testnet Ascent"/>

      </Menu>
    );
  }

  render() 
  {
    const pathname = this.props.location.pathname;

    let kpi = this.props.kpi;
    
    // wait on the response from KPI list to load application
    if (NCNETWORK_REQUESTS_ENABLED && kpi.momentUpdated == null) { 
      return (
        <NCLoading
          title={"Connecting to Server"}
          marginTop={140}/>
      );
    }    

    // ------------------------------------------------

    let momentEnd = kpi.data.endTimestamp ? moment.unix(kpi.data.endTimestamp) : null;

    let latestBlockNumber = null;
    if (kpi.data.dbBlockTableHead) {
      latestBlockNumber = kpi.data.dbBlockTableHead;
    } else {
      latestBlockNumber = kpi.data.endBlock;
    } 

    let dbLag = (kpi.data.currentBlockchainHead && latestBlockNumber) ? 
                BigNumber(kpi.data.currentBlockchainHead).minus(BigNumber(latestBlockNumber)) : 0;
    let lastUpdated = kpi.momentUpdated;

    return (
      <div className="NCPage">
        <div className="NCHeader pt-navbar">
          <div className="row">
            
            <div className="pt-navbar-group navbar-group-left">
              <Link to={"/dashboard"} className="logo">
                <img className="logo-img" src="img/logo/aion-icon.svg" alt="logo"/>
                <span className="title">Dashboard</span>
              </Link>
              <span className="pt-navbar-divider"></span>              
              <Popover
                content={this.renderExplorerMenu()}
                interactionKind={PopoverInteractionKind.CLICK}
                position={Position.BOTTOM}>
                <Button 
                  className="navbar-btn-active pt-button pt-minimal"
                  iconName="pt-icon-dashboard"
                  rightIconName="pt-icon-caret-down"
                  text="Explorer"/>          
              </Popover>
              {/*<Button 
                  className="navbar-btn-active pt-button pt-minimal"
                  iconName="timeline-bar-chart"
                  onClick={() => window.open("https://metrics0.aion.network", "Aion | Metrics")}
                  text="Metrics"/>*/}   
            </div>

            <div className="pt-navbar-group navbar-group-right">
              <NCTopLevelSearch/>
              <span className="pt-navbar-divider"></span>
              <NCLivenessIndicator 
                momentEnd={momentEnd}
                latestBlockNumber={latestBlockNumber}
                dbLag={dbLag}
                lastUpdated={lastUpdated}
              />
              { this.connectionMenu }
            </div>

          </div>
        </div>
        
        <div className="NCPageContent">
          <div className="container">
          { this.props.children }
          </div>
        </div>
        <div className="NCFooter">
          <div>
            <a className="footer-container" target="_blank" href="https://aion.network">
              <span className="text">Powered By</span>
              <img className="logo" src="img/logo/aion-icon.svg" alt="logo"/>
            </a>
          </div>  
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return ({
    kpi: state.kpi,
  })
})(NCLayout);
































