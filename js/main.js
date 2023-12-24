var signinMail = document.querySelector('#signinMail');
var signinPass = document.querySelector('#signinPass');

var signupName = document.querySelector('#signupName');
var signupMail = document.querySelector('#signupMail');
var signupPass = document.querySelector('#signupPass');

var signUpBtn = document.querySelector('.sign-up');
var signInBtn = document.querySelector('.sign-in');

var exist = document.querySelector('#exist');
var incorrect = document.querySelector('#incorrect');
var user = document.querySelector('#user');


// console.log(user);
// console.log(signinMail,signinPass,signupName,signupPass,signupMail);

// ^ welcome at home page
var username = localStorage.getItem('userName')
if (username !== null) {
    user.innerHTML = "Welcome " + username
};


var signUpArr = [];
// & check if the user exsist in localStorage
if(localStorage.getItem('users') !== null){
    signUpArr = JSON.parse(localStorage.getItem('users'));
    // console.log(signUpArr);
};



// & create new user
function createNewUser(){
    var user = {
        name : signupName.value,
        mail : signupMail.value,
        pass : signupPass.value
    };
    return user;
}

// ^ signup
function signUp(){
    if(isSignUpInputsEmpty() === false){
        exist.innerHTML = `
        <span class="text-danger m-3">All inputs is required</span>`;
    }
    else{
        if(validMail() === true){
            var newUser = createNewUser();
            if(signUpArr === 0){
            signUpArr.push(newUser);
            console.log(signUpArr);
            setInLocalStorage();
            exist.innerHTML = `
            <span class="text-success m-3">Success</span>`;
            // clearInputs();
            };
    
            if(isMailExist() === false){
                exist.innerHTML = `
                <span class="text-danger m-3">email already exists</span>`;
                // console.log('exist');
            }
            else{
                signUpArr.push(newUser);
                console.log(signUpArr);
                setInLocalStorage();
                exist.innerHTML = `
                <span class="text-success m-3">Success</span>`;
            };
        }
        else{
            exist.innerHTML = `
            <span class="text-danger m-3">Enter a valid mail</span>`;
        };
        };
        
    
};
signUpBtn.addEventListener('click', signUp);

function validMail(){
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(regex.test(signupMail.value) === true){
        return true;
    }
    else{
        return false;
    };
};


// & set in localStorage 
function setInLocalStorage(){
    localStorage.setItem('users', JSON.stringify(signUpArr));
}

// & clear inputs
function clearInputs(){
    signupName.value = '';
    signupMail.value = '';
    signupPass.value = '';
};

// & check if the mail exist
function isMailExist(){
    for(var i = 0 ; i < signUpArr.length ; i++){
        if(signUpArr[i].mail.toLowerCase() === signupMail.value.toLowerCase()){
            // exist.innerHTML = `
            // <span class="text-danger m-3">email already exists</span>`;
            return false;
        };
    };
};

// & check if the signup inputs empty
function isSignUpInputsEmpty(){
    if(signupName.value === '' || signupMail.value === '' || signupPass.value === ''){
        return false;
    }
    else{
        return true;
    };
};


// ! get the URL
var path = location.href
console.log(path);
var baseurl = path.split('/')
console.log(baseurl);
for(var i = 0 ; i < baseurl.length ; i++){
    var url = '/home.html'
    console.log(url);
};


// ^ login
function signIn(){
    if(isSignInInputsEmpty() === false){
        incorrect.innerHTML = `
        <span class="text-danger m-3">All inputs is required</span>`;
    }
    else{
        for(var i = 0 ; i < signUpArr.length ; i++){
            if(signUpArr[i].mail.toLowerCase() === signinMail.value.toLowerCase() && signUpArr[i].pass.toLowerCase() === signinPass.value.toLowerCase()){
                localStorage.setItem('userName', signUpArr[i].name);
                location.replace(url); 
            }
            else{
                incorrect.innerHTML = `
                <span class="text-danger m-3">incorrect email or password</span>`;
            };
        };
    };
};

signInBtn.addEventListener('click', signIn);



// & check if the signin inputs empty
function isSignInInputsEmpty(){
    if(signinMail.value === '' || signinPass.value === ''){
        return false;
    }
    else{
        return true;
    };
};
