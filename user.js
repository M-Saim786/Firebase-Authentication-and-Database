console.log('error')
var printdata  =document.getElementById('printdata')
console.log(printdata)
firebase.database().ref('Dishes').once('value' ,(sanp) =>
{
    var details = Object.values(sanp.toJSON())
    console.log(details)


    details.forEach(element => {
        console.log(element.imgUrl)
        printdata.innerHTML += `

        <div class="card col m-2 col-lg-3 col-md-4 col-sm-6 col-12" id="" style="border: 1px solid red;">
               
  




        <img src="${element.imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
            card's content.</p>
       
    </div>
    </div>
        `
    });
})