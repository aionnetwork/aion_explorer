/* eslint-disable */
import React, { Component } from 'react';
import moment from 'moment';

import { NCEntity } from 'lib/NCEnums';
import NCEntityLabel, { parseClientTransaction } from 'components/common/NCEntityLabel';
import NCEntityDetail from 'components/common/NCEntityDetail';

import { nc_isStrEmpty, nc_numFormatter, nc_numFormatterAmp, nc_numFormatterBytes, nc_numFormatterACSensitive, nc_isPositiveInteger, nc_hexPrefix } from 'lib/NCUtility';

import {BigNumber} from 'bignumber.js';
const EMPTY_STR = "Not Available";

export default class NCTxnDetail extends Component
{
  constructor(props) {
    super(props);
  }

  parseTxnLog = (txnLog) => {
    try {
      let parsed = JSON.parse(txnLog);

      if (!parsed || parsed.length == 0)
        return false;

      return(JSON.stringify(parsed, undefined, 2))
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  render() {
    let { entity } = this.props;

    let parsedTxnLog = this.parseTxnLog(entity.transactionLog)

    let desc = 
    [
      {
        field: "Time Sealed",
        value: moment.unix(entity.blockTimestamp).format('LLLL'),
      },
      {
        field: "Transaction Hash",
        value: <NCEntityLabel
                  entityType={NCEntity.TXN}
                  entityId={entity.transactionHash}
                  linkActive={false}/>,
      },
      {
        field: "Block Number",
        value: <NCEntityLabel
                  entityType={NCEntity.BLOCK}
                  entityId={entity.blockNumber}/>,
      },
      // ---------------------------------------------------------------
      {
        field: "Index",
        value: entity.transactionIndex != null ? entity.transactionIndex : EMPTY_STR,
      },
      {
        field: "Nonce",
        value: entity.nonce != null ? BigNumber(String(entity.nonce), 16).toString(10) : EMPTY_STR,
      },
      {
        field: "From Address",
        value: <NCEntityLabel 
                  entityType={NCEntity.ACCOUNT} 
                  entityId={entity.fromAddr}/>,
      },
      {
        field: "To Address",
        value: entity.toAddr ? 
                <NCEntityLabel 
                  entityType={NCEntity.ACCOUNT} 
                  entityId={entity.toAddr}/> :
                "Contract Creation",
      },
      // ---------------------------------------------------------------
      {
        field: "Value",
        value: entity.value == null ? EMPTY_STR : <span className="strong">{nc_numFormatterACSensitive(entity.value, null, true) + " AION"}</span>,
      },
      {
        field: "Nrg Price",
        value: entity.nrgPrice == null ? EMPTY_STR : 
            <span>
              { nc_numFormatterAmp(entity.nrgPrice, null) }
              <span className="subtitle"><a href="https://github.com/aionnetwork/aion/wiki/Aion-Terminology" target="_blank">(what's an Amp?)</a></span>
            </span>
      },
      {
        field: "Nrg Consumed",
        value: entity.nrgConsumed != null ? nc_numFormatter(entity.nrgConsumed, 18) + " NRG" : EMPTY_STR,
      },
      // ---------------------------------------------------------------
      {
        field: "Txn Logs",
        value: parsedTxnLog ? <pre className={"nc-resizable"}>{ parsedTxnLog }</pre> : "No Transaction Logs",
      },
      {
        field: "Input Data",
        value: entity.data ? <pre className={"nc-resizable"}>{ entity.data }</pre> : "No Input Data",
      },
    ];

    return (
      <NCEntityDetail desc={desc}/>
    );
  }
}
























