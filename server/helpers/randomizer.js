// this is used solely for social-based logins
const generateRandomStrings = (length, alphanumericOnly = true) => {
    // Alphabets + numerical
    let dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    if(!alphanumericOnly) dict += '~!@#$%^&*()_+`-=[];\'\\,./{}|:"<>?'
    let res = ''

    while(length--){
        res += dict[Math.floor(Math.random() * dict.length)]
    }

    return res
}

module.exports = { generateRandomStrings }