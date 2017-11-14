const express = require('express');
const axios = require('axios')
const url = require('url')
const bodyParser= require('body-parser')
const GoogleSearch = require('google-search')
const helpers = require('./helper.js')
var app = express()


var companyName = "Asana"

// const googleQ = "site:linkedin.com (inurl:in OR inurl:pub) -inurl:dir -inurl:job -inurl:jobs -inurl:jobs2 -intitle:profiles -inurl:groups 'University Recruiter at ";
// const googleSearch = "https://www.googleapis.com/customsearch/v1?key="+googleKey+"&cx="+googlecx+"&q="

// const hunterIo1 = 'https://api.hunter.io/v2/domain-search?domain='
// const hunterIo2 = '.com&api_key='+hunterApi

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res)=>{
    if(typeof(req.query.cname) != 'undefined'){
        companyName = req.query.cname
    }else{
        companyName = 'Asana'
    }

    const foo = await helpers.googleReq(companyName)
    const bar = await helpers.hunterIo(companyName)
        

    // console.log(foo)
    // console.log(bar)

    return res.render('index', {
        first: foo.first, 
        last: foo.last, 
        email: bar.email, 
        domain: bar.domain, 
        rEmails: bar.rEmails
    })

    // axios.get(googleSearch + googleQ + companyName)
    //     .then(function(response){
    //         var i=0;
    //         Object.keys(response.data.items).forEach(function(key){
    //             recruiters[i] = response.data.items[key].title
    //             i++;
    //         })
    //         var fRec = []
    //         var lRec = []
    //         for(var i=0; i<recruiters.length; i++){
    //             fRec.push((recruiters[i].split('|')[0]).split(' ')[0])
    //             lRec.push((recruiters[i].split('|')[0]).split(' ')[1])
    //         }

    //         axios.get(hunterIo1 + companyName + hunterIo2)
    //             .then(function(response){
    //             var email = response.data.data.pattern
    //             domain = response.data.data.domain
    //             rEmails = helpers.concatEmails(fRec, lRec, email, domain)

    //             res.render('index', {first: fRec, last: lRec, email: email, domain: domain, rEmails:rEmails})
    //         }).catch(()=> res.render('404'))
    //     }).catch(()=> res.render('404'))
})

app.listen(6969)
console.log('port 6969')
