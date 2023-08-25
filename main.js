import './style.css'
import { formFieldsData } from './formData.js';

let index = 0;

function renderData(data) {
  const container = document.querySelector("#container");
  container.innerHTML = "";
  container.innerHTML += `<h2>REGISTRATION FORM</h2>`;

  let form = document.createElement("form");
  form.innerHTML += `<h3>${data[index].sectionName}</h3>`
  data[index].formInputs.forEach(function(formInput){
    form.innerHTML += `<div class = "box"><label>${formInput.label}</label>
    <input type = '${formInput.type}' placeholder = '${formInput.placeholder}' id = '${formInput.id}'>
    <i class="fa fa-check-circle"></i>
    <i class="fa fa-exclamation-circle"></i>
    <small>Error Msg</small></div>`
    
  })
  let nextBtn = document.createElement("button")
  nextBtn.innerText = "Next";
  nextBtn.className = "nextBtn";
  if(index == data.length - 1 ) {
    nextBtn.style.display = "none";
  } 
  nextBtn.addEventListener("click", renderNextform);

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
  // submitBtn.addEventListener("click", renderBackform);
  form.append(nextBtn, backBtn,  submitBtn);
  container.append(form);
}   
renderData(formFieldsData);

// add event....

function renderNextform(event){
  event.preventDefault();
  validate();
  index ++;
  renderData(formFieldsData);
}

function renderBackform(event){
  event.preventDefault();
  index --;
  renderData(formFieldsData);
}

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

// define the validate function....

function validate(){

// validate username....
 const fnameVal = document.getElementById("fname").value.trim();
 console.log("==========",fnameVal);
 if(fnameVal === ""){
   setErrorMsg(fname, "username can not be blank");
 }else if(fnameVal.length <= 2){
   setErrorMsg(fname, "username can not be blank");
 }else{
   setSuccessMsg(fname);
 }

  // validate username....
  const lnameVal = document.getElementById("lname").value.trim();
  if(lnameVal === ""){
    setErrorMsg(lname, "username can not be blank");
  }else if(lnameVal.length <= 2){
    setErrorMsg(lname, "username can not be blank");
  }else{
    setSuccessMsg(lname);
  }
  successMsg();
}

//  // validate email....
//  const emailVal = document.getElementById("email").value.trim();
//  if(emailVal === ""){
//    setErrorMsg(email, "email can not be blank");
//  }else if(!isEmail(emailVal)){
//    setErrorMsg(email, "Not a valid Email");
//  }else{
//    setSuccessMsg(email);
//  }

//  // validate phone....
//  const phoneVal = document.getElementById("phone").value.trim();
//  if(phoneVal === ""){
//    setErrorMsg(phone, "phone can not be blank");
//  }else if(phoneVal.length != 10){
//    setErrorMsg(phone, "Not a valid phone num");
//  }else{
//    setSuccessMsg(phone);
//  }

//  // validate passward....
//  const passwordVal = document.getElementById("password").value.trim();
//  if(passwordVal === ""){
//    setErrorMsg(password, "password can not be blank");
//  }else if(passwordVal.length <= 5){
//    setErrorMsg(password, "Minimum 6 char");
//  }else{
//    setSuccessMsg(password);
//  }

//  // validate cpassward....
//  const cpasswordVal = document.getElementById("cpassword").value.trim();
//  if(cpasswordVal === ""){
//    setErrorMsg(cpassword, "confirm password can not be blank");
//  }else if(passwordVal != cpasswordVal){
//    setErrorMsg(cpassword, "password are not matching");
//  }else{
//    setSuccessMsg(cpassword);
//  }



function setErrorMsg(input, errormsgs) {
 const formControl = input.parentElement;
 console.log('>>>>',formControl);
 const small = formControl.querySelector("small");
 formControl.className = "box error"
 small.innerText = errormsgs
}

function setSuccessMsg(input) {
 const formControl = input.parentElement;
 formControl.className = "box success";
}