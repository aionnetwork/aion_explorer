/* eslint-disable */
import React, { Component } from 'react';
import NCComponentLazyLoad from 'components/common/NCComponentLazyLoad';
import NCExplorerSection from 'components/common/NCExplorerSection';
import NCExplorerHead from 'components/common/NCExplorerHead';

<<<<<<< HEAD
import Recaptcha from 'react-recaptcha';

=======
>>>>>>> 9eac678... latest staging dashboard v2
import { TextArea, FormGroup, Button, Position, Classes, Popover, Menu, MenuItem, InputGroup, Intent, PopoverInteractionKind } from "@blueprintjs/core";


export default class NCExplorerContactUs extends Component
{
<<<<<<< HEAD

  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      topic: '',
      type: '',
      text: '',
      value:'',
      recaptcha:'',
      button: true,
      range: [0,1000],
      display:false
    } 
    this.captcha = this.captcha.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  captcha(key){
      this.setState({recaptcha:response})
  }

  verifyCallback(response) {
       //this.state.recaptcha = response;
        this.setState({recaptcha:response,button:false});
   };

   handleTypeChange(event) {
    
    this.setState({type : event.target.value});
    
  }
  handleTopicChange(event) {
    
    this.setState({topic : event.target.value});
    
  }
  handleTextChange(event) {
    
    this.setState({text : event.target.value});
    
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const { isLoading, isDataValid, isDataEmpty, loadingStr, invalidDataStr, emptyDataStr } = this.props;

    // create a variable to store the component instance
    let recaptchaInstance;
 
    // create a reset function
    const resetRecaptcha = () => {
      recaptchaInstance.reset();  
    };

=======
  render() {
    const { isLoading, isDataValid, isDataEmpty, loadingStr, invalidDataStr, emptyDataStr } = this.props;

>>>>>>> 9eac678... latest staging dashboard v2
    const breadcrumbs = [
      {
        link: '/',
        body: 'Home',
      },
      {
        link: '#',
        body: 'Contact Us',
      }

    ];
      
    const contact_container ={border:'#ccc solid 1px',padding:'10px',borderRadius:'5px',maxWidth:'500px'}
    const contact_input ={width:"100%"}
    const contact_textArea ={width:"100%",height:"200px"}
    const contact_submit ={right:'10'}
    const page =
      <div> 
        <NCExplorerHead
          
          breadcrumbs={breadcrumbs}
          title={"Contact Us"}
<<<<<<< HEAD
          subtitle={'We value your opinion'}
=======
          subtitle={'Your opinion is valued'}
>>>>>>> 9eac678... latest staging dashboard v2
   

        />  

        <div style={contact_container}>
<<<<<<< HEAD
        <form>
            <FormGroup
                
                label="Topic"
                labelFor="topic-input"
=======

            <FormGroup
                
                label="Topic"
                labelFor="text-input"
>>>>>>> 9eac678... latest staging dashboard v2
                labelInfo="(required)"
                className="pt-form-group "

            >
<<<<<<< HEAD
              <select id="topic-input" onChange={this.handleTopicChange} defaultValue="default"  style={contact_input} className="pt-input pt-large">
                <option value="default">Choose an item</option>
                <option value="Analytics">Analytics</option>
                <option value="Accounts">Accounts</option>
                <option value="Blocks">Blocks</option>
                <option value="Contracts">Contracts</option>
                <option value="Tokens">Tokens</option>
                <option value="Transactions">Transactions</option>
                <option value="Others">Others</option>
               
=======
              <select defaultValue="default"  style={contact_input} className="pt-input pt-large">
                <option value="default">Choose an item...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
>>>>>>> 9eac678... latest staging dashboard v2
              </select>
            </FormGroup>
             <FormGroup
               
                label="Type"
<<<<<<< HEAD
                labelFor="type-input"
                labelInfo="(required)"
            >
              <select  id="type-input" onChange={this.handleTypeChange} defaultValue="default"  style={contact_input} className="pt-input pt-large" >
                <option value="default">Choose an item...</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature Request</option>
                <option value="suggestions">Suggestion</option>
                
=======
                labelFor="text-input"
                labelInfo="(required)"
            >
              <select defaultValue="default"  style={contact_input} className="pt-input pt-large" >
                <option value="default">Choose an item...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
>>>>>>> 9eac678... latest staging dashboard v2
              </select>
            </FormGroup>
            <FormGroup
                
                label="Message"
                labelFor="text-input"
                labelInfo="(required)"
            >
              <TextArea
<<<<<<< HEAD
                id="text-input"
=======
>>>>>>> 9eac678... latest staging dashboard v2
                large={true}
                intent={"#000"}
                className="pt-input pt-large"
                rows="6"
                style={contact_textArea}
<<<<<<< HEAD
                onChange={this.handleChange}
                
              />
            </FormGroup>
            
            
             {(!this.state.display)&& 
                <Recaptcha
                  ref={e => recaptchaInstance = e}
                 
                  sitekey="6LfwrXMUAAAAAEpZCdMFD0ba96ryOUDGPMyqHZPA"
                  verifyCallback={this.verifyCallback.bind(this)}
            />}

            
            {/*<input type="submit" value="Submit" />*/}
            <Button type="submit" intent="success" onClick={()=>{console.log('submit')}} text="Submit" />
        </form>  
=======
                
              />
            </FormGroup>

            <Button intent="success" onClick={()=>{console.log('submit')}} text="Submit" />
            
>>>>>>> 9eac678... latest staging dashboard v2
        </div>
        
      </div>;

    return(
      <NCComponentLazyLoad>
        <NCExplorerSection
          className="NCExplorerPage"

          isLoading={isLoading}
          isDataValid={isDataValid} 
          isDataEmpty={isDataEmpty}
          
          loadingStr={loadingStr}
          invalidDataStr={invalidDataStr}
          emptyDataStr={emptyDataStr}
          isToplevelSection={true}
        
          content={page}/>
      </NCComponentLazyLoad>
    );
  }
}