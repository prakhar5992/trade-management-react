import React, { Component } from 'react';

import FileViewer from 'react-file-viewer';

import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import axios from 'axios';

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
            checkerAction: String(this.state.checkerAction),
            checkerComments: String(this.state.checkerComments)
  

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
            console.log(this.state.taskdata);
            this.state.applicantName = this.state.taskdata.applicantName;
            this.state.accountNumber = this.state.taskdata.accountNumber;
            this.state.contactNumber = this.state.taskdata.contactNumber;
            this.state.addressLine1 = this.state.taskdata.addressLine1;
            this.state.addressLine2 = this.state.taskdata.addressLine2;
            this.state.pincode= this.state.taskdata.pincode;
            this.state.city = this.state.taskdata.city;
            this.state.state = this.state.taskdata.state;
            this.state.country = this.state.taskdata.country;
            this.state.comments = this.state.taskdata.comments;
            this.state.reliability = this.state.taskdata.reliability;
            this.state.checkerAction = this.state.taskdata.checkerAction;
            this.state.checkerComments = this.state.taskdata.checkerComments;
        })
        .catch((error) => {
            console.log(error);
        });
}

  render() {
      function setBGColor(value){
        if(value == "Low"){
            return {background: "#c1f9bb"} 
        }
        else if(value == "Medium"){
            return {background: "#f9f7bb"} 
        }
        else {
            return {background: "#f9bbbb"} 
        }
      };
      return (
        <div className="Middle">
        <div className="Title">
      <h1 className="h1-style">Checker Task : {this.state.taskid}</h1>
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
                                  <input type="text" name= 'applicantName' value={this.state.taskdata.applicantName} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} readonly />
                                  <br />
                                  <br />
                                  <label>Address Line 1</label>
                                  <br />
                                  <input type="text" name ="addressLine1" value={this.state.taskdata.addressLine1} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>State</label>
                                  <br />
                                  <input type="text" name="state" value={this.state.taskdata.state} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Reliability</label>
                                  <br />
                                  <input type="text" name="state" value={this.state.taskdata.reliability} style={setBGColor(this.state.taskdata.reliability)} onChange={(e) => this.changeHandler(e)} />
                                  <br />

                              </div>
                              <div className="start-instance-side-two">
                                  <label>Account Number</label>
                                  <br />
                                  <input type="number" name = 'accountNumber' value={this.state.taskdata.accountNumber} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Address Line2</label>
                                  <br />
                                  <input type="text" name="addressLine2" value={this.state.taskdata.addressLine2} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Country</label>
                                  <br />
                                  <input type="text" name="country" value={this.state.taskdata.country} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              <div className="start-instance-side-three">
                                  <label>Contact Number</label>
                                  <br />
                                  <input type="number" name = 'contactNumber' value={this.state.taskdata.contactNumber} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>City</label>
                                  <br />
                                  <input type="text" name="city" value={this.state.taskdata.city} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                 
                                  <label>Pincode</label>
                                  <br />
                                  <input type="number" name="pincode" value={this.state.taskdata.pincode} style={{background: "#dfeaf5"}} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              
                         
                      </div>
                      <div className = "start-instance-comment">
                              <label>Maker Comments : {this.state.taskdata.comments}</label>
                              <br />
                              <br />

                              <label>Comments</label>
                              <br />
                              <textarea name="checkerComments" defaultValue={this.state.taskdata.checkerComments} onChange={(e) => this.changeHandler(e)} />
                              <br />
                              <br />
                          </div>
                          <div className = "start-instance-comment">
                              
                          </div>
                      <div className="form-button">
                          <input name="checkerAction" type="submit" value="Approve" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
                          <input name="checkerAction" type="submit" value="Reject" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
                          <input name="checkerAction" type="submit" value="Back to Maker" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
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

