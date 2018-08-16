const url = 'https://us-central1-omg-codemygear.cloudfunctions.net/comments/jason';
var content = document.getElementById('content');
var text = document.getElementById('text');
var email = document.getElementById('email');
var submit = document.getElementById('submit');

getComments();

async function getComments() {
  var resp = await fetch(url);
  var comments = await resp.json();
  var html = "";

  comments.forEach(function(comment) {
    html = html + `<br><div><span>${comment.message}</span><br>
      <br><span><b>Posted By:</b> <a href="mailto:${comment.email}">${comment.email}</a></span><br>
      <br><span><b>Created at:</b> ${comment.created_at}</span><br>
    </div>`;
  });
  content.innerHTML = html;
}

submit.addEventListener('click', function() {
  postComments([{
    "email": email.value,
    "message": text.value
  }]);
});

async function postComments(comment) {
  var resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  getComments();
};

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// content.addEventListener('click', function(){
//   if (event.target.className === "completeTask"){
//     putToDo([{
//       id: event.target.id,
//       completed: true
//     }]);
//   }
// });
