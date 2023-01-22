// alert('welcome to Admin Panel')

var table = document.getElementById("getProduct");
var edit_pro = document.getElementById("edit_pro");

var DISH_NAME = document.getElementById("DISH_NAME");
var PRICE = document.getElementById("PRICE");
var QTY = document.getElementById("QTY");
img_url ="" //current use rimg
var progress1 = document.getElementById("progress")




firebase
  .database()
  .ref("Dishes")
  .once("value", function (db_Values) {
    var valueObj = Object.values(db_Values.toJSON());
    // console.log(valueObj)

    // valueObj.map(function(){

    // })

    var i;
    for (i of valueObj) {
      console.log(i);
      console.log(i.qty);

      table.innerHTML += `
<tr>
<td>${i.Dish_Name}</td>
<td>${i.Dish_Key}</td>
<td>${i.Price}</td>
<td>${i.qty}</td>
<td><img src='${i.imgUrl}' style='width:100px; height:100px;' ></td>
<td> <button class='btn btn-primary' id=${i.Dish_Key} onclick='edit(this)'>Edit</button></td>
<td> <button class='btn btn-danger' id=${i.Dish_Key} onclick='deleteProduct(this)'>Delete</button></td>
</tr>
`;
    }
  });

function deleteProduct(e) {
  console.log("clikc");
  console.log(e.id);

  firebase.database().ref("Dishes").child(e.id).remove();
  window.location.reload();
  alert('Deleted product')
}


async function edit (e){

    console.log(e.id)
    localStorage.setItem("Current_item",e.id)//set 
    
    event.preventDefault()
    // /get data 
   await  firebase.database().ref("Dishes").child(e.id).once("value",(snapshot)=>{
        console.log(snapshot.toJSON())
        DISH_NAME.value= snapshot.toJSON()["Dish_Name"]
        PRICE.value= snapshot.toJSON()["Price"]
        QTY.value= snapshot.toJSON()["qty"]
        localStorage.setItem("Current_Img",snapshot.toJSON()["imgUrl"])

    })
   
    edit_pro.setAttribute("style" , 'display:block')
}



var inp = document.getElementsByTagName("input")
console.log(inp[3].type)


inp[3].addEventListener("click",function(){
    inp[3].onchange = e =>{
        files = e.target.files;
        reader = new FileReader();

        console.log(reader.result)
        reader.onload = function(){           
        }
        reader.readAsDataURL(files[0])
        console.log(files[0])
        document.getElementById("upload").removeAttribute("disabled")

       
    }
    
})

 upload.addEventListener("click",function (){
    event.preventDefault()
    console.log(files[0])
    var strg = firebase.storage().ref()

    var uploadTask = strg.child(`images/${files[0].name}`)
    .put(files[0])

    uploadTask.on('state_changed', 
      (snapshot) => {
      
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress1.style.display="inline"
        progress1.innerText=`Progress : ${progress}`
        // console.log('Upload is ' + progress + '% done');

        if(progress==0){
            progress1.innerText="Start upload"
        //   alert("Upload Process Star\n Plz Wait For Upload Image In Data Base")
        }
        if(progress<25){
            progress1.innerText=`Progress : ${progress}`
        }
        if(progress<50){
            progress1.innerText=`Progress : ${progress}`
        }
        if(progress<75){
            progress1.innerText=`Progress : ${progress}`
        }

        if(progress==100){
            progress1.innerText="complete"
        //   alert("Upload Process Finish \n Successfully Upload Image In Data Base")
        }
        
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            img_url =   downloadURL;
          console.log('File available at', downloadURL);
          console.log('File available at', img_url);
         document.getElementById('submit').removeAttribute('disabled')
        });
      }
    );

   


})
var submit = document.getElementById("submit")
submit.addEventListener('click',async(e) =>{



    event.preventDefault()
    e.preventDefault()
    var key = localStorage.getItem("Current_item")
    console.log(key)

    var img = localStorage.getItem("Current_Img")
    console.log(img)
    console.log(DISH_NAME.value)

    var obj ={

        Dish_Name:DISH_NAME.value,
        Price:  PRICE.value,
        qty : QTY.value,
        imgUrl: img_url=="" ? img : img_url

    }
    await  firebase.database().ref("Dishes").child(key).update(obj)
    localStorage.removeItem("Current_item")

    // localStorage.clear() 
    window.location.reload()

})

