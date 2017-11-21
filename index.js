const express = require('express');
const axios = require('axios')
const url = require('url')
const bodyParser= require('body-parser')
const helpers = require('./helper.js')
require('dotenv').config()
var app = express()


var companyName = "Asana"

const googleQ = "site:linkedin.com (inurl:in OR inurl:pub) -inurl:dir -inurl:job -inurl:jobs -inurl:jobs2 -intitle:profiles -inurl:groups 'University Recruiter at ";
const googleSearch = "https://www.googleapis.com/customsearch/v1?key="+process.env.GK+"&cx="+process.env.GCX+"&q="

const hunterIo1 = 'https://api.hunter.io/v2/domain-search?domain='
const hunterIo2 = '.com&api_key='+process.env.HK

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    if(typeof(req.query.cname) != 'undefined'){
        companyName = req.query.cname
    }

    axios.get(googleSearch + googleQ + companyName)
        .then(function(response){

            let recruiters = []
            let i=0;
            let fRec = []
            let lRec = []
            
            Object.keys(response.data.items).forEach(function(key){
                recruiters[i] = response.data.items[key].title
                i++;
            })

            for(i=0; i<recruiters.length; i++){
                fRec.push((recruiters[i].split('|')[0]).split(' ')[0])
                lRec.push((recruiters[i].split('|')[0]).split(' ')[1])
            }

        axios.get(hunterIo1 + companyName + hunterIo2)
            .then(function(response){
                let email = response.data.data.pattern
                domain = response.data.data.domain
                rEmails = helpers.concatEmails(fRec, lRec, email, domain)

                res.render('index', {
                    first: fRec, 
                    last: lRec, 
                    email: email, 
                    domain: domain, 
                    rEmails:rEmails
                })
        })
    })
})

app.listen(3000)
console.log('port 3000')
