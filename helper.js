const axios = require('axios')
require('dotenv').config()

const googleQ = "site:linkedin.com (inurl:in OR inurl:pub) -inurl:dir -inurl:job -inurl:jobs -inurl:jobs2 -intitle:profiles -inurl:groups 'University Recruiter at ";
const googleSearch = "https://www.googleapis.com/customsearch/v1?key="+ process.env.GK +"&cx="+ process.env.GCX +"&q="

const hunterIo1 = 'https://api.hunter.io/v2/domain-search?domain='
const hunterIo2 = '.com&api_key='+process.env.HK

module.exports = {
    concatEmails: function(recruiter, pattern, domain){
        let i=0;
        let rEmails = []

        while(i < recruiter.length){
            switch(pattern) {
                case '{f}{last}':
                    // return ((recruiter.first.charAt(0)+recruiter.last+'@'+domain).toLowerCase())
                    rEmails.push((recruiter[i].first.charAt(0)+recruiter[i].last+'@'+domain).toLowerCase())
                    i++;
                    break

                case '{first}{last}':
                    rEmails.push((recruiter[i].first+recruiter[i].last+'@'+domain).toLowerCase())
                    i++;
                    break

                case '{first}.{last}':
                    // return ((recruiter.first+'.'+recruiter.last+'@'+domain).toLowerCase())
                    rEmails.push((recruiter[i].first+'.'+recruiter[i].last+'@'+domain).toLowerCase())
                    i++
                    break

                case '{first}{l}':
                    // return ((recruiter.first+recruiter.last.charAt(0)+'@'+domain).toLowerCase())
                    rEmails.push((recruiter[i].first+recruiter[i].last.charAt(0)+'@'+domain).toLowerCase())
                    i++
                    break;

                case '{last}{first}':
                    // return ((recruiter.last+recruiter.first+'@'+domain).toLowerCase())
                    rEmails.push((recruiter[i].last+recruiter[i].first+'@'+domain).toLowerCase())
                    i++
                    break

                case '{first}':
                    // return ((recruiter.first+'@'+domain).toLowerCase())
                    rEmails.push((recruiter[i].first+'@'+domain).toLowerCase())
                    i++
                    break

                case '{last}':
                    rEmails.push((recruiter[i].last+'@'+domain).toLowerCase())
                    i++
                    break

                default:
                    // return ((recruiter.first+recruiter.last+'@'+domain).toLowerCase())
                    rEmails.push((recruiter[i].first+recruiter[i].last+'@'+domain).toLowerCase())
                    i++
            }
        }
        return rEmails
    },
    getRecruiters(response){
        let tmpRecruiters = []
        let recruiters = []
        let i=0

        Object.keys(response.data.items).forEach(function(key){
            tmpRecruiters[i] = response.data.items[key].title
            i++;
        })

        for(let i=0; i<tmpRecruiters.length; i++){
            let recruiter = {
                first:'',
                last:'',
                email:''
            }

            recruiter.first = ((tmpRecruiters[i].split('|')[0]).split(' ')[0])
            recruiter.last = ((tmpRecruiters[i].split('|')[0]).split(' ')[1])
            recruiters.push(recruiter)
        }

        return recruiters
    },
    getRecruiterEmails(response, recArr){
        let em = response.data.data.pattern
        let domain = response.data.data.domain

        rEmails = module.exports.concatEmails(recArr, em, domain)

        if(rEmails !=[]){
            for(i=0; i<recArr.length; i++){
                recArr[i].email = rEmails[i]
            }
        }

        return recArr
    }
}