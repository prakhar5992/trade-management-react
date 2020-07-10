const exp = require('express');
const apps = exp();
const cors = require('cors');
const axios = require('axios');
const session = require("express-session");
const bodyParser = require('body-parser');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
apps.use(cors());
apps.use(bodyParser.urlencoded({extended:true}));
apps.use(bodyParser.json());
apps.set('view engine','ejs');
apps.listen(3001);

////////////////GET TASK LIST////////////////
apps.get('/tasklist/:group',(req,res)=>{
    var group = req.params.group;
    var username = 'pamAdmin';
    var password = 'redhatpam1!';
    var url = 'http://localhost:8080/kie-server/services/rest/server/queries/tasks/instances/pot-owners?status=Created&status=Ready&status=Reserved&status=InProgress&groups='+group+'&page=0&pageSize=20&sortOrder=true';
    console.log(url);
    axios.get(url,
    {headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Basic '+ new Buffer.from(username + ':' + password).toString('base64')
    }})
    .then(response=> {
        console.log(response.data);
        res.send({data:response.data});
    }).catch(err => console.log('Error occured get task '+err));
});

////////////////GET TASK DATA////////////////
apps.get('/gettaskdetails/:containerid/:taskid',(req,res)=>{
    var containerid = req.params.containerid;
    var taskid = req.params.taskid;
    var username = 'pamAdmin';
    var password = 'redhatpam1!';
    var url = 'http://localhost:8080/kie-server/services/rest/server/containers/'+containerid+'/tasks/'+taskid+'/contents/input'
    axios.get(url,
    {headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Basic '+ new Buffer.from(username + ':' + password).toString('base64')
    }})
    .then(response=> {
        console.log(response.data);
        res.send({data:response.data});
    })
    .catch(err => {
        console.log("Error" +err);
        res.send(err)
    });
});

////////////////CREATE INSTANCE////////////////
apps.post('/instance/create/:containerId/:processId/:userId',(req,res)=>{
    var containerId = req.params.containerId;
    var processId = req.params.processId;
    var userId = req.params.userId;
    console.log(containerId+' & '+processId); 
    var username = 'pamAdmin';
    var password = 'redhatpam1!';
    var reqData = req.body;
    var data = '{ "tradeDOV": {"com.s_space.trademanagementprocess.tradeDO":' +JSON.stringify(reqData)+'},"initiator":"'+userId+'"}';
    var jsonString =data;
    console.log(jsonString);
    var url = 'http://localhost:8080/kie-server/services/rest/server/containers/'+containerId+'/processes/'+processId+'/instances?';
    axios.post(url,jsonString,{headers: {
        'Authorization': 'Basic '+ new Buffer.from(username + ':' + password).toString('base64'),
        'Content-Type' : 'application/json'
    }})
    .then(response => {
                    console.log(response.data);
                    res.json(response.data);
                })
    .catch(err => {
                    console.log("Error" +err);
                    res.send(err)
    });
});

////////////////COMPLETE TASK////////////////
apps.post('/completetask/:containerid/:taskid/:user',(req,res)=>{
    var containerid = req.params.containerid;
    var taskid = req.params.taskid;
    var user = req.params.user
    var username = 'pamAdmin';
    var password = 'redhatpam1!';
    var reqData = req.body;
    var jsonString ='{ "tradeDO": {"com.s_space.trademanagementprocess.tradeDO":'+JSON.stringify(reqData)+'}}';
    console.log(jsonString)
    var urlComplete = "http://localhost:8080/kie-server/services/rest/server/containers/"+containerid+"/tasks/"+taskid+"/states/completed?user="+user+"&auto-progress=true";
    axios.put(urlComplete,jsonString,
        {headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Basic '+ new Buffer.from(username + ':' + password).toString('base64')
        }})
        .then(response => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.log("Error" +err);
            res.send(err)
    });
   
});