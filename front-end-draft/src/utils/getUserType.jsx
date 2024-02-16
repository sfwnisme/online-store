/*
* user => 2001
* admin => 1995
* writer => 1996
* product manager => 1999
* not match => the not matched value
*/

const getUserType = (userCode) => {
    let userType = userCode
    switch (userCode) {
        case '1995':
            userType = 'Admin'
            break;
        case '1999':
            userType = 'PM'
            break;
        case '1996':
            userType = 'Writer'
            break;
        case '2001':
            userType = 'User'
            break;
        default:
            userType = userCode
            break;
    }
    return userType
}

export default getUserType

/*:::NOTE-------------------
|---------------------------
| * this util function handle the user's type depends on the user code from the database
| the userCode type is string
| * if you pass any unmatched userCode it will return the same value
|---------------------------
*/