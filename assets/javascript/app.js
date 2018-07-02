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

  $('#searchForm').on('submit', function (event) {
      devent.preventDefault();

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
  
