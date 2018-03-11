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
    var trainName = $(".train-name").val().trim();
    var destination = $(".destination").val().trim();
    var trainTime = $(".train-time").val().trim();
    var frequency = $(".frequency").val().trim();
    
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $(".form-group input").val(null);

});

//gives just the added value versus the all the values
database.ref().on("child_added", function(childSnapshot){

    var snap = childSnapshot.val();

    var nextArrival = moment().diff(snap.startDate, "months");
    var minutesAway = (monthsWorked * snap.rate);

    $("tbody").append(
        "<tr><td scope='col'>" + snap.trainName + "</td><td scope='col'>" + snap.destination + "</td><td scope='col'>" + snap.frequency + "</td><td scope='col'>" + nextArrival + "</td><td scope='col'>" + minutesAway + "</td></tr>");

},  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});