var email = document.getElementById("email");
var password = document.getElementById("password");
var name1 = document.getElementById("name");
var role = document.getElementsByName("role");
var getrole = "";

var signup = document.getElementById("signup");
var signIn = document.getElementById("signin");

signup.addEventListener("click", function (e) {
  e.preventDefault();
  for (var i = 0; i < role.length; i++) {
    if (role[i].checked) {
      getrole = role[i].value;
      break;
    }
  }

    if (getrole == "") {
      if ((email.value, name1.value, role.value, password.value == "")) {
      // alert("select one ");
      var alertshow = document.getElementById("alert");
      alertshow.classList.remove("hide");
      setTimeout(() => {
        alertshow.classList.add("hide");
      }, 1500);
      window.scrollTo(0, 0);
    }
  }
  
  
  else {
    console.log(getrole);
    var success_alert = document.getElementById("success");
    success_alert.classList.remove("hide");
    setTimeout(() => {
      success_alert.classList.add("hide");
    }, 1500);
    window.scroll(0, 0);
  }
  // console.log(email.value)
  // console.log(password.value)

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((user) => {
      console.log(user.user.uid);

      //get current user

      localStorage.setItem("email", email.value);

      localStorage.setItem("uid", user.user.uid);

      // signup.setAttribute("style","display:none")
      // signin.setAttribute("style","display:none")

      //send database
      var obj = {
        name: name1.value,
        email: email.value,
        password: password.value,
        getrole: getrole, //multi user
        // home_service=>user,worker,admin>panel
        uid: user.user.uid,
      };

      // send data :

      // ecom add : storage
      // firebase.database().ref("users/").push(obj)
      // firebase.database().ref("users/").child(user.user.uid).push(obj)

      //send database
      if (getrole == "user") {
        firebase.database().ref("users/").child(user.user.uid).set(obj);
      } else {
        firebase.database().ref("Admin/").child(user.user.uid).set(obj);
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((user) => {
          console.log(user.user.uid);
        })
        .catch((err) => {
          alert(err.message);
        });
    })
    .catch((e) => {
      // console.log(console.log(e.message))
      alert(e.message);
    });
});

signIn.addEventListener("click", function (e) {
  e.preventDefault();

  for (var i = 0; i < role.length; i++) {
    if (role[i].checked) {
      getrole = role[i].value;
      break;
    }
  }
  if (getrole == "") {
    alert("select one ");
  } else {
    console.log(getrole);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((user1) => {
      console.log(user1.user);

      localStorage.setItem("uid", user1.user.uid);

      // window.location.href="new.html"
      if (getrole == "user") {
        window.location.replace("user.html"); //page change
      } else {
        window.location.replace("Admin.html"); //page change
      }
      // signup.setAttribute("style","display:none")
      // signin.setAttribute("style","display:none")
      // signout.removeAttribute("style")
    })
    .catch((err) => {
      alert(err.message);
    });
});

// var getuid = localStorage.getItem("uid")
// console.log(getuid)
// if(getuid!=null){
//     signup.setAttribute("style","display:none")
//     signin.setAttribute("style","display:none")
//     signout.removeAttribute("style")

// }

// signout.addEventListener("click",function(){
//     firebase.auth().signOut()
// })

// function Student(name, class1) {
//   this.name = name;
//   this.class1 = class1;
// }

// var std1 = new Student("asad", 13);
// var std2 = new Student("ali");

// console.log(std1, std2);
