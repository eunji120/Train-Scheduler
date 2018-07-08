$("document").ready(function() {

var index = 0;

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyAAsV_9hYGzCRr51WcVmzkJy6IBg6-0gkY",
    authDomain: "somethingshort-june2018.firebaseapp.com",
    databaseURL: "https://somethingshort-june2018.firebaseio.com",
    projectId: "somethingshort-june2018",
    storageBucket: "somethingshort-june2018.appspot.com",
    messagingSenderId: "53159698419"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#searchForm').submit(function() {
      event.preventDefault();
      $('#tableContent').show();

      var name = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTime = $("#time-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      database.ref().push({
          name: name,
          destination: destination,
          firstTime: firstTime,
          frequency: frequency
      });

    $('#name-input').val("");
    $('#destination-input').val("");
    $('#time-input').val("");
    $('#frequency-input').val("");

        return false;
  });

  database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {
    
    var firstTime = childSnapshot.val().firstTime;
    var tFrequency = parseInt(childSnapshot.val().frequency);
    var firstTrain = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTrain);
    console.log(firstTime);
    var currentTimeCalc = moment().subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    var tRemainder = diffTime%tFrequency;
    var minutesRemaining = tFrequency - tRemainder;
    var nextTrain = moment().add(minutesRemaining, "minutes").format ("hh:mm A");
    var beforeCalc = moment(firstTrain).diff(currentTimeCalc, "minutes");
    var beforeMinutes = Math.ceil(moment.duration(beforeCalc).asMinutes());

    if ((currentTimeCalc - firstTime) < 0) {
        nextTrain = childSnapshot.val().firstTime;
        console.log("Before First Train");
        minutesRemaining = beforeMinutes;
    }
    else {
        nextTrain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
        minutesRemaining = tFrequency - tRemainder;
        console.log("Working");
    }

    //Adding new table rows and data
        var newRow = $("<tr>");
            newRow.addClass("row-" + index);
        var cell1 = $("<td>").text(childSnapshot.val().name);
        var cell2 = $("<td>").text(childSnapshot.val().destination);
        var cell3 = $("<td>").text(childSnapshot.val().frequency);
        var cell4 = $("<td>").text(nextTrain);
        var cell5 = $("<td>").text(minutesRemaining);

        newRow.append(cell1);
        newRow.append(cell2);
        newRow.append(cell3);
        newRow.append(cell4);
        newRow.append(cell5);

        $("#tableContent").append(newRow);

        index++;

  }, function (error) {

        alert(error.code);
  });

});