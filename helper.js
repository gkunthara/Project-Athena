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

    requestHelper: function(){
        
    }
}