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

//upon click of Submit button, the input values are stored in the database
$(".submit").on("click", function() {

    event.preventDefault();    

    var trainName = $(".train-name").val().trim();
    var destination = $(".destination").val().trim();
    var trainTime = $(".train-time").val().trim();
    var frequency = $(".frequency").val().trim();

    //if any fields are null, the submit button won't work and a warning message appears
    if ($(".form-group input").val() === '') {
        $(".warning").fadeIn(1000).fadeOut(2000);
        $(".submit").preventDefault();
    }

    //pushes new values into Firebase database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

    //clears all inputs after submitting
    $(".form-group input").val(null);

});

//calculates nextArrival and minutesAway - appends those variables and database values to the table
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
