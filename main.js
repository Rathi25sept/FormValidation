import './style.css'
import { formFieldsData } from './formData.js';

let index = 0;

function renderData(data) {
  const container = document.querySelector("#container");
  container.innerHTML = "";
  container.innerHTML += `<h2>REGISTRATION FORM</h2>`;

  let form = document.createElement("form");
  let box = document.createElement("div");
  box.id = "formBox";
  box.innerHTML += `<h3>${data[index].sectionName}</h3>`
  
  data[index].formInputs.forEach(function(formInput){
    box.innerHTML += `<div class = "box"><label>${formInput.label}</label>
    <input type = '${formInput.type}' placeholder = '${formInput.placeholder}' id = '${formInput.id}'>
    <i class="fa fa-check-circle"></i>
    <i class="fa fa-exclamation-circle"></i>
    <small>Error Msg</small></div>`
    form.append(box);
    container.append(form);
    
  })
}
renderData(formFieldsData);

function createButton(data) {
  let form = document.querySelector("form")
  let nextBtn = document.createElement("button")
  nextBtn.innerText = "Next";
  nextBtn.className = "nextBtn";
  if(index == data.length - 1 ) {
    nextBtn.style.display = "none";
  } 

  let nextBtn2 = document.createElement("button")
  nextBtn2.innerText = "Next";
  nextBtn2.className = "nextBtn2";
  if(index == data.length - 1 ) {
    nextBtn.style.display = "none";
  } 

  let backBtn = document.createElement("button")
  backBtn.innerText = "back";
  backBtn.className = "backBtn";
  if(index == 0) {
    backBtn.style.display = "none";
  } 
  backBtn.addEventListener("click", renderBackform);

  let submitBtn = document.createElement("button")
  submitBtn.innerText = "Submit";
  submitBtn.className = "submitBtn";
  if(index == data.length - 1) {
    submitBtn.style.display = "inline-block";
  }
  form.append(nextBtn, backBtn,  submitBtn);
  
}   
createButton(formFieldsData);

function submitBtnfunction(){
  let submitButton = document.querySelector(".submitBtn")
  submitButton.addEventListener("submit", function(event){
    event.preventDefault();
    renderNextform3();
  });
}
submitBtnfunction();

function sendData(successRate, count) {
  console.log('-------<<',successRate,count);
    if(successRate === count) {
    alert("Registration successfull");
    swal("Welcome!", "Registration successfull", "success");
  }
}

// for final data validation

function successMsg() {
  let formBox = document.getElementsByClassName("box");
  console.log('......',formBox);
  let count = formBox.length - 1;
  console.log('-------',count);
  for(let i=0; i<formBox.length; i++){
    if(formBox[i].className === "box success") {
      let successRate = 0 + i;
      console.log("===>>>>",successRate);
       sendData(successRate, count);
   }else {
     return false;
   }
 }
}
successMsg();

function setErrorMsg(errormsgs) {
  let inputBox = document.querySelectorAll('input');
  inputBox.forEach(function(item){

    const formControl = item.parentElement;
    const small = formControl.querySelector("small");
    formControl.classList.add("box", "error");
    small.innerText = errormsgs ;
    small.style.display = "block";
  })
}

function setSuccessMsg(input) {
  const formControl = input.parentElement;
  formControl.classList.add("box", "success");
  formControl.classList.remove("error");
 }
  
// more email validate....

function isEmail(emailVal) {
  let atSymbol = emailVal.indexOf("@");
  if(atSymbol < 1){
    return false;
  }
  let dot = emailVal.lastIndexOf(".");
  if(dot <= atSymbol + 3) {
    return false;
  }
  if(dot === emailVal.length - 1){
    return false;
  }else{
    return true;
  }
 }

// add event....
function renderNextform(){
  let nextBtn = document.querySelector(".nextBtn")
  nextBtn.addEventListener("click", function(event){
    event.preventDefault();
    const fnameVal = document.getElementById("fname").value;
    console.log("===name",fnameVal, fname);
    if(fnameVal === ""){
      setErrorMsg("username can not be blank");
    }else if(fnameVal.length <= 2){
      setErrorMsg("username can not be blank");
    }else{
      setSuccessMsg(fname);
    }

    const lnameVal = document.getElementById("lname").value;
    if(lnameVal === ""){
      setErrorMsg("username can not be blank");
    }else if(lnameVal.length <= 2){
      setErrorMsg("username can not be blank");
    }else{
      setSuccessMsg(lname);
      index ++;
      let formbox = document.querySelector("#formBox");
      formbox.innerHTML = "";
      renderData(formFieldsData);
      createButton(formFieldsData);
      renderNextform2();
    }

  });
}
renderNextform();

function renderNextform2(){
  let nextBtn = document.querySelector(".nextBtn")
  nextBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const phoneVal = document.getElementById("phone").value;
    console.log("===phone", phone);
    console.log("value=========",phoneVal);
    if(phoneVal === ""){
      setErrorMsg("phone can not be blank");
    }else if(phoneVal.length != 10){
      setErrorMsg("Not a valid phone num");
    }else{
      setSuccessMsg(phone);
    }
    
    
    const emailVal = document.getElementById("email").value;
    if(emailVal === ""){
      setErrorMsg("email can not be blank");
    }else if(!isEmail(emailVal)){
      setErrorMsg("Not a valid Email");
    }else{
      setSuccessMsg(email);
      index ++;
      renderData(formFieldsData);
      createButton(formFieldsData);
      renderNextform3();
    }
    console.log(index);
  })
}

function renderNextform3(){
  let nextBtn = document.querySelector(".nextBtn")
  nextBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const passwordVal = document.getElementById("password").value;
    if(passwordVal === ""){
      setErrorMsg(password, "password can not be blank");
    }else if(passwordVal.length <= 5){
      setErrorMsg(password, "Minimum 6 char");
    }else{
      setSuccessMsg(password);
    }

    const cpasswordVal = document.getElementById("cpassword").value;
    if(cpasswordVal === ""){
      setErrorMsg(cpassword, "confirm password can not be blank");
    }else if(passwordVal != cpasswordVal){
      setErrorMsg(cpassword, "password are not matching");
    }else{
      setSuccessMsg(cpassword);
      index ++;
      renderData(formFieldsData);
      successMsg();
    }
  })
}

function renderBackform(event){
  event.preventDefault();
  index --;
  renderData(formFieldsData);
  createButton(formFieldsData);
}




