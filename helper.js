const axios = require('axios')
require('dotenv').config()

const googleQ = "site:linkedin.com (inurl:in OR inurl:pub) -inurl:dir -inurl:job -inurl:jobs -inurl:jobs2 -intitle:profiles -inurl:groups 'University Recruiter at ";
const googleSearch = "https://www.googleapis.com/customsearch/v1?key="+process.env.googlekey+"&cx="+process.env.googlecx+"&q="

const hunterIo1 = 'https://api.hunter.io/v2/domain-search?domain='
const hunterIo2 = '.com&api_key='+process.env.hunterkey

module.exports = {
    concatEmails: function(first, last, pattern, domain){
        var rEmails = []
        var i =0;
        while(first[i] != null){
            switch(pattern) {
                case '{f}{last}':
                    rEmails.push((first[i].charAt(0)+last[i]+'@'+domain).toLowerCase())
                    i++;
                    break;
                case '{first}{last}':
                    rEmails.push((first[i]+last[i]+'@'+domain).toLowerCase())
                    i++;
                    break;
                case '{first}.{last}':
                    rEmails.push((first[i]+'.'+last[i]+'@'+domain).toLowerCase())
                    i++
                    break;
                case '{first}{l}':
                    rEmails.push((first[i]+last[i].charAt(0)+'@'+domain).toLowerCase())
                    i++
                    break;
                case '{last}{first}':
                    rEmails.push((last[i]+first[i]+'@'+domain).toLowerCase())
                    i++
                    break;
                case '{first}':
                    rEmails.push((first[i]+'@'+domain).toLowerCase())
                    i++
                    break;
                case '{last}':
                    rEmails.push((last[i]+'@'+domain).toLowerCase())
                    i++
                    break;
                default:
                    rEmails.push((first[i]+last[i]+'@'+domain).toLowerCase())
                    i++
            }
        }

        return rEmails
    },

    googleReq: async (companyName)=>{
        let recruiters = []
        axios.get(googleSearch + googleQ + companyName)
            .then((response) => {
                var i=0;
                Object.keys(response.data.items).forEach(function(key){
                    recruiters[i] = response.data.items[key].title
                    i++;
                })
                var fRec = []
                var lRec = []
                for(var i=0; i<recruiters.length; i++){
                    fRec.push((recruiters[i].split('|')[0]).split(' ')[0])
                    lRec.push((recruiters[i].split('|')[0]).split(' ')[1])
                }

                // let hunterio = getEmail(comapnyName)
                console.log(fRec, lRec)
                return {
                    first: fRec,
                    last: lRec
                }

            })
    },

    hunterIo: async (companyName)=>{
        axios.get(hunterIo1 + companyName + hunterIo2)
            .then(function(response){
                var email = response.data.data.pattern
                domain = response.data.data.domain
                rEmails = helpers.concatEmails(fRec, lRec, email, domain)
                console.log(email, domain, rEmails)
                return {
                    email: email,
                    domain: domain,
                    rEmails: rEmails
                }
        })
    }
}