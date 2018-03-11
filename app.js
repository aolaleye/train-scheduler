// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMjLnh05pJ5O63BhagzPLrdfnZzUVau8Q",
    authDomain: "train-scheduler-d154c.firebaseapp.com",
    databaseURL: "https://train-scheduler-d154c.firebaseio.com",
    projectId: "train-scheduler-d154c",
    storageBucket: "train-scheduler-d154c.appspot.com",
    messagingSenderId: "300257344484"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$(".submit").on("click", function() {
    event.preventDefault();    
    var eName = $(".name").val().trim();
    var eRole = $(".role").val().trim();
    var eStartDate = $(".start-date").val().trim();
    var eRate = $(".monthly-rate").val().trim();
    
    console.log(eName);
    console.log(eRole);
    console.log(eStartDate);
    console.log(eRate);

    database.ref().push({
        name: eName,
        role: eRole,
        startDate: eStartDate,
        rate: eRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $(".form-group input").val(null);

});

//gives just the added value versus the all the values
database.ref().on("child_added", function(childSnapshot){

    var snap = childSnapshot.val();

    var monthsWorked = moment().diff(snap.startDate, "months");
    var totalBilled = (monthsWorked * snap.rate);

    $("tbody").append(
        "<tr><td scope='col'>" + snap.name + "</td><td scope='col'>" + snap.role + "</td><td scope='col'>" + snap.startDate + "</td><td scope='col'>" + monthsWorked + "</td><td scope='col'>" + snap.rate + "</td><td scope='col'>" + totalBilled + "</td></tr>");

},  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});