const axios = require('axios')
require('dotenv').config()

const googleQ = "site:linkedin.com (inurl:in OR inurl:pub) -inurl:dir -inurl:job -inurl:jobs -inurl:jobs2 -intitle:profiles -inurl:groups 'University Recruiter at ";
const googleSearch = "https://www.googleapis.com/customsearch/v1?key="+ process.env.GK +"&cx="+ process.env.GCX +"&q="

const hunterIo1 = 'https://api.hunter.io/v2/domain-search?domain='
const hunterIo2 = '.com&api_key='+process.env.HK

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
    }
}