import React, { Component } from 'react';

import documentImage from './Address_Change_Document.pdf';

import FileViewer from 'react-file-viewer';

import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import axios from 'axios';



const file = documentImage

const type = 'pdf'

const status = 'Pending'

class maker extends Component {
  constructor(props) {
      super(props);
      this.state = {
        user : props.match.params.user,
        group : props.match.params.group,
        taskid : props.match.params.taskid,
        applicantName:'',
        accountNumber: '',
        contactNumber: '',
        addressLine1: '',
        addressLine2: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
        comments: '',
        reliability: '',
        checkerAction: '',
        checkerComments: '',
        taskdata: {}
      };
  }
  changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  };
  
  submitHandler = (e) => {
      if(this.state.close == 'Postpone'){ 
        this.props.history.push("/MainPage/" + this.state.group + "/" + this.state.user );
      } else {

        e.preventDefault();
        console.log(this.state);
        const req = {
            applicantName: String(this.state.applicantName),
            accountNumber: Number(this.state.accountNumber),
            contactNumber: Number(this.state.contactNumber),
            addressLine1: String(this.state.addressLine1),
            addressLine2: String(this.state.addressLine2),
            pincode: Number(this.state.pincode),
            city: String(this.state.city),
            state: String(this.state.state),
            country: String(this.state.country),
            comments: String(this.state.comments),
            reliability: String(this.state.reliability),
            checkerAction: '',
            checkerComments: ''
  

        }
     
        const urlepv = process.env.REACT_APP_TASK_COMPLETE;
        const url = urlepv.replace('#CONTAINERID#',process.env.REACT_APP_CONTAINER_ID)+'/'+this.state.taskid+'/'+this.state.user;
        console.log (url);
        axios
          .post(url, req)
          .then((res) => {
              console.log(res);
              alert ("Task id "+ this.state.taskid + " completed");
              this.props.history.push("/MainPage/" + this.state.group + "/" + this.state.user );
          })

          .catch((error) => {
              alert(error);
          });
    }

  };
  onClickHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
  };

  componentDidMount() {
    const taskUrlepv = process.env.REACT_APP_TASK_DETAILS;
    const taskurl = taskUrlepv.replace('#CONTAINERID#',process.env.REACT_APP_CONTAINER_ID)+'/'+this.state.taskid;
    axios
        .get(taskurl)
        .then((response) => {
            console.log(response);
            this.setState({ taskdata: response.data.data.tradeDO['com.s_space.trademanagementprocess.tradeDO']});
            this.state.applicantName =  this.state.taskdata.applicantName;
            this.state.accountNumber= this.state.taskdata.accountNumber;
            this.state.contactNumber= this.state.taskdata.contactNumber;
            this.state.addressLine1= this.state.taskdata.addressLine1;
            this.state.addressLine2= this.state.taskdata.addressLine2;
            this.state.pincode= this.state.taskdata.pincode;
            this.state.city= this.state.taskdata.city;
            this.state.state= this.state.taskdata.state;
            this.state.country= this.state.taskdata.country;
            this.state.comments= this.state.taskdata.comments;
            this.state.reliability= this.state.taskdata.reliability;

          
        })
        .catch((error) => {
            console.log(error);
        });
}

  render() {
    function showCheckerComment(checkerComments){
          if (checkerComments != null && checkerComments != ''){
            
            return (
                  <div>
                    <label>Checker Comments : {checkerComments}</label>
                    <br />
                    <br />
                </div>
                 );
          }
     }
      return (
        <div className="Middle">
        <div className="Title">
      <h1 className="h1-style">Maker Task Id : {this.state.taskid}</h1>
                   </div>

       <div className="MainBody">

          <div className="customer-details">
                  <form onSubmit={this.submitHandler}>
                      <div className="start-instance-layout">
                          <div className="start-instance-layout-full">
                              <h4 className="sub-section-header">Applicant Details</h4>
                              <div className="start-instance-three-coloum">
                              <div className="start-instance-side-one">
                                  <label>Applicant Name</label>
                                  <br />
                                  <input type="text" name= 'applicantName' defaultValue={this.state.taskdata.applicantName} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Address Line 1</label>
                                  <br />
                                  <input type="text" name ="addressLine1" defaultValue={this.state.taskdata.addressLine1} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>State</label>
                                  <br />
                                  <input type="text" name="state" defaultValue={this.state.taskdata.state} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  
                              </div>
                              <div className="start-instance-side-two">
                                  <label>Account Number</label>
                                  <br />
                                  <input type="number" name = 'accountNumber' defaultValue={this.state.taskdata.accountNumber} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Address Line2</label>
                                  <br />
                                  <input type="text" name="addressLine2" defaultValue={this.state.taskdata.addressLine2} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Country</label>
                                  <br />
                                  <input type="text" name="country" defaultValue={this.state.taskdata.country} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              <div className="start-instance-side-three">
                                  <label>Contact Number</label>
                                  <br />
                                  <input type="number" name = 'contactNumber' defaultValue={this.state.taskdata.contactNumber} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>City</label>
                                  <br />
                                  <input type="text" name="city" defaultValue={this.state.taskdata.city} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                 
                                  <label>Pincode</label>
                                  <br />
                                  <input type="number" name="pincode" defaultValue={this.state.taskdata.pincode} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              
                         
                      </div>
                      <div className = "start-instance-comment">
                            {showCheckerComment(this.state.taskdata.checkerComments)}
                              <label>Comments</label>
                              <br />
                              <textarea name="comments" defaultValue={this.state.taskdata.comments} onChange={(e) => this.changeHandler(e)} />
                              <br />
                              <br />
                          </div>
                      <div className="form-button">
                          <input name="sentToChecker" type="submit" value="Send to Checker" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
                          {/* <input name="close" type="submit" value="Postpone" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} /> */}
                          <br />
                          <br />
                      </div>
                    </div>
                    </div>
                  </form>
          </div>
          </div>
          </div>
      );
  }
}

export default maker;

