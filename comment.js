var email = document.getElementById("email");
var password = document.getElementById("password");
var username = document.getElementById("name");
// var admin = document.getElementById('admin')
// var user = document.getElementById("user");
// console.log(admin.value  , user.value)
var user = document.getElementsByName("role");
var formDiv = document.getElementById("formDiv");
console.log(user.length);
var get_role = "";
// console.log(user  ,admin)
// console.log(email, password, username);

// console.log(firebase.auth());

var signup = document.getElementById("signup");
signup.addEventListener("click", (e) => {
  e.preventDefault();
  //   console.log(email.value , password.value ,username.value,admin.Checked,user.Checked)
  console.log("click");
  for (var i = 0; i < user.length; i++) {
    if (user[i].checked) {
      get_role = user[i].value;
    }
  }
  console.log(get_role);
  if (get_role == "admin") {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((admin) => {
        console.log(admin.user.uid);
        var obj = {
          name: username.value,
          email: email.value,
          password: password.value,
          role: get_role,
          Admin_Uid: admin.user.uid,
        };
        firebase.database().ref("admin/").push(obj);
        formDiv.style.display = "none";
        // window.location.href="admin.html";
        var datatable = document.getElementById("admintable");
        datatable.style.display = "block";
        var firebaseRef = firebase.database().ref("admin");
        firebaseRef.on("value", (snapshot) => {
          var data = snapshot.val();
          console.log(data.length);

          console.log(data);
          for (let i in data) {
            datatable.innerHTML += `
        <tr>
        <td>
${data[i].name}
</td>
        <td>
        ${data[i].email} 
        </td>
        <td>
        ${data[i].password}
        </td>
        <td>
        ${data[i].role}
</td>
<td>
<button type="submit" class="btn btn-primary" onclick='update()'>Update</button>
<button type="submit" class="btn btn-danger" onclick='delete()'>Delete</button>
        </tr>
        `;
            // console.log(data[i].email);
          }
        });
      })

      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  } else if (get_role == "user") {
    formDiv.style.display = "none";

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        console.log(user.user.uid);
        var obj = {
          name: username.value,
          email: email.value,
          password: password.value,
          role: get_role,
          user_Uid: user.user.uid,
        };
        firebase.database().ref("user/").push(obj);
        var datatableUser = document.getElementById("userTable");
        datatableUser.style.display = "block";
        datatableUser.innerHTML = `
         <tr>
         <td>
        Welcome to USer Panel 
         </td>
   
       </tr>     
         `;
        // var firebaseRef = firebase.database().ref("user");
        // firebaseRef.on("value", (snapshot) => {
        //   var dataUser = snapshot.val();
        //   console.log(dataUser);
        //   console.log(datatableUser);
          
        //   for (let i in dataUser) {
        //     datatableUser.innerHTML += `
        // <tr>
        // <td>
        // ${dataUser[i].email} 
        // </td>
        // <td>
        // ${dataUser[i].password}
        // </td>
        // </tr>     
        // `;
        //   }
        // });
        // window.location.href="user.html";
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });

   
  }
});

var signin = document.getElementById("signin");
signin.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("sign Up Clicked");

  for (var i = 0; i < user.length; i++) {
    if (user[i].checked) {
      get_role = user[i].value;
    }
  }
  console.log(get_role);

  if (get_role == "admin") {
    // window.location.href = "admin.html";

    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((admin) => {
        console.log(admin);
      });
  } else if (get_role == "user") {
    // window.location.href = "user.html";
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        console.log(user);
      });
  }
});
