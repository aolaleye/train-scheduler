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

    // // Assumptions
    // var frequency = 3;

    // // Time is 3:30 AM
    // var trainTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    // console.log(trainTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + timeDifference);

    // // Time apart (remainder)
    // var remainder = timeDifference % frequency;
    // console.log(remainder);

    // // Minute Until Train
    // var minutesAway = frequency - remainder;
    // console.log("MINUTES TILL TRAIN: " + minutesAway);

    // // Next Train
    // var nextArrival = moment().add(minutesAway, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

$(".submit").on("click", function() {

    event.preventDefault();    

    var trainName = $(".train-name").val().trim();
    var destination = $(".destination").val().trim();
    var trainTime = $(".train-time").val().trim();
    var frequency = $(".frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

    $(".form-group input").val(null);

});

//gives just the added value versus the all the values
database.ref().on("child_added", function(childSnapshot){

    var snap = childSnapshot.val();

    var trainTimeConverted = moment(snap.trainTime, "HH:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    var remainder = timeDifference % snap.frequency;

    var minutesAway = snap.frequency - remainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");


    $("tbody").append(
        "<tr><td scope='col'>" + snap.trainName + "</td><td scope='col'>" + snap.destination + "</td><td scope='col'>" + snap.frequency + "</td><td scope='col'>" + nextArrival + "</td><td scope='col'>" + minutesAway + "</td></tr>");

},  function(errorObject) {
    console.log("The read failed: " + errorObject.code);

});
