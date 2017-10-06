const express = require('express');
const request = require('request')
const axios = require('axios')
const bodyParser= require('body-parser')
const GoogleSearch = require('google-search')
var app = express()

var googleSearch = new GoogleSearch({
    key: 'AIzaSyAPRwsIzko_9n3VffTHeGhbq3dz5AGc8CA',
    cx: '013565610204912550067:frat_jzztpg'
  });

app.set('view engine', 'ejs')
app.use(bodyParser.json())

app.get('/', function(req, res){

    var recruiters = []
    googleSearch.build({
        q: "site:linkedin.com (inurl:in OR inurl:pub) -inurl:dir -inurl:job -inurl:jobs -inurl:jobs2 -intitle:profiles -inurl:groups 'University Recruiter at Asana'",
        siteSearch: "linkedin.com" // Restricts results to URLs from a specified site 
      }, function(error, response) {

        var i=0;
        Object.keys(response.items).forEach(function(key){
            recruiters[i] = response.items[key].title
            i++;
        })
        var fRec = []
        var lRec = []
        for(var x=0; x<recruiters.length; x++){
            fRec.push((recruiters[x].split('|')[0]).split(' ')[0])
            lRec.push((recruiters[x].split('|')[0]).split(' ')[1])
        }
        var email;
        axios.get('https://api.hunter.io/v2/domain-search?domain=asana.com&api_key=da0fc356f1cda1e9f90a5cab277f0ba8a71c9455')
            .then(function(response){
            email = response.data.data.pattern
            domain = response.data.data.domain

            res.render('index', {first: fRec, last: lRec, email: email, domain: domain})
        })

      });
})

app.listen(6969)
console.log('port 6969')