console.log('this is a client side object');


const weatherfrom = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');

weatherfrom.addEventListener('submit' , (e) =>{
    e.preventDefault();
 const location = search.value;

 messageone.textContent = 'loading...';
 messagetwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((weatherdata) => {
 if(weatherdata.error){
messageone.textContent = weatherdata.error
 }else{
     messageone.textContent = weatherdata.location;
     messagetwo.textContent = weatherdata.weather;

 }
    });
});
});