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

        <div class="card col m-2  col-lg-3 col-md-4 col-sm-6 col-12" id="" style="width:16rem">
        <img src="${element.imgUrl}" class="card-img-top" alt="..." style='height:30vh'>
        <div class="card-body">
        <h5 class="card-title">${element.Dish_Name}</h5>
        <p class="card-text">Price of Dish is "${element.Price}"</p>
       <a class='btn btn-primary'>Buy Now</a>
    </div>
    </div>
        `
    });
})