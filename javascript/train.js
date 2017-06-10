// $(document).ready(function(){

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-IZTSyJkIjGCSRZi_aPZpm04ZseHo52Y",
  authDomain: "week7-trainschedule.firebaseapp.com",
  databaseURL: "https://week7-trainschedule.firebaseio.com",
  projectId: "week7-trainschedule",
  storageBucket: "week7-trainschedule.appspot.com",
  messagingSenderId: "898929250580"
};
firebase.initializeApp(config);

      var trainBase = firebase.database();

// $(#somebutton_goes_here).on('click' function() {
$("#submit").on("click", function(event) {
  event.preventDefault();

        //collect the data from the html form, create variable to hold data
        // train name, etc
        // when retrieving the first train data make sure to parse it into a Unix TIMESTAMP
        var trainName = $("#train-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = moment($("#first-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequency-input").val().trim();


        trainBase.ref().push({
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
        });
    // 'push' that data into firebase (assume that the 'child_added' listener updates HTML)
        // trainBase.ref().push(trainInfo);

        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

        // alert that train was added
        alert("Train successfully added!!");

        // clear out our HTML form for the next input
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#first-input").val("");
        $("#frequency-input").val("");
      });


// something.on('child_added', function(childSnapshot){
    trainBase.ref().on("child_added", function(childSnapshot, prevChildKey) {

// console.log('the childSnapshot data', childSnapshot.val());
    console.log(childSnapshot.val());

  /// create the local variables to store the data from firebase
    var fName = childSnapshot.val().name;
    var fDestination = childSnapshot.val().destination;
    var fFrequency = childSnapshot.val().frequency;
    var fFirstTrain = childSnapshot.val().firstTrain;

// FIRST MAKE the table row show up with empty strings for 'timeInMinutes' / 'tArrival'



// THEN DO THIS MATH
//compute the diffenece in time from 'now' and the first train, store in var
// get the remainder of time after using 'mod' with the frequency
//subtract the remainder from the frequency, store in var 'timeInMinutes'
// format 'timeInMinutes' and store in var, 'make pretty'
    var differenceTimes = moment().diff(moment.unix(fFirstTrain), "minutes");
    var remainder = moment().diff(moment.unix(fFirstTrain), "minutes") % fFrequency ;
    var minutes = fFrequency - remainder;

    var arrival = moment().add(minutes, "m").format("hh:mm A");

    $("#trainTable").prepend("<tr><td>" + fName + "</td><td>" +
      fDestination + "</td><td>" + fFrequency + "</td><td>" +
      arrival + "</td><td>" + minutes + "</td></tr>");

// ITS OKAY TO SHOW EMPTY STRINGS FOR 'timeInMinutes' / 'tArrival'
        // append to our table of trains, inside the 'tbody', with a new row of the train data

});
// }
