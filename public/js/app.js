console.log('client side javascript file');

// fetch("http://api.weatherstack.com/current?access_key=a1538cf53ace330aab6af4225cebcb83&query=covelong").then(res=>{
//     res.json().then(data=>{
//         console.log(data);
//     })
// })

// fetch("http://localhost:3000/weatherdata?address=covelong").then(res=>{
//     res.json().then(data=>{
//         if (data.error) {
//             console.log(error)
//         }else{
//             console.log(data);
//         }
//     })
// })

const formEle = document.querySelector('form');
const searchVal =document.querySelector('input');
const result1 =document.querySelector('label');
const button     = document.querySelector('button');
const result = document.querySelector('#msg-1');
formEle.addEventListener("submit",(e)=>{
    e.preventDefault();    
    if (!searchVal.value) {
        result.textContent ='Please enter address';
        return
    }
    button.disabled=true;
    result.textContent='Loading...!'    
    fetch("http://localhost:3000/weatherdata?address="+searchVal.value).then(res=>{
        res.json().then(data=>{
            if (data.Error) {
                console.log('ERROR');
                result.textContent='Error'
            }else{
                result.textContent = data.report;
            }
            
            button.disabled=false;
        })
    }).catch(err=>{
        console.log(err);
    })   
})


