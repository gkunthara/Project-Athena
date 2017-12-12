const express = require('express');
const axios = require('axios')
const url = require('url')
const bodyParser= require('body-parser')
const helpers = require('./helper.js')
require('dotenv').config()
const app = express()


let companyName = "Asana"

const googleQ = "site:linkedin.com (inurl:in OR inurl:pub) -inurl:dir -inurl:job -inurl:jobs -inurl:jobs2 -intitle:profiles -inurl:groups 'University Recruiter at ";
const googleSearch = "https://www.googleapis.com/customsearch/v1?key="+process.env.GK+"&cx="+process.env.GCX+"&q="
const hunterIo1 = 'https://api.hunter.io/v2/domain-search?domain='
const hunterIo2 = '.com&api_key='+process.env.HK

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// recArr = [
//     {
//         first: "tom",
//         last: "johnson",
//         email:"tjohn@email.com"
//     }
// ]

app.get('/', (req, res)=>{
    if(typeof(req.query.cname) != 'undefined'){
        companyName = req.query.cname
    }
    axios.get(googleSearch + googleQ + companyName + "'")
        .then(function(response){
            let recArr = helpers.getRecruiters(response)

        axios.get(hunterIo1 + companyName + hunterIo2)
            .then(function(response){
                recArr = helpers.getRecruiterEmails(response, recArr)

                res.render('index', {
                    recruiter: recArr
                })
            })
            .catch(error=>{
                console.log(error)    
            });
    })
    .catch(error=>{
        console.log(error)
    });

    // res.render('index', {
    //     recruiter: recArr
    // })
})

app.listen(3000, ()=>{
    console.log('http://localhost:3000/')
})
