angular.module('cardcast-receiver', [
  'ngSanitize'
])
//set up  controller for Receiver.
.controller('MainController', function($scope, $sanitize, Markdown) {

  var isCasting = false;
  var who = null;
  var cardId = null;
  $scope.color = null;
  $scope.font = null;

  //broadcast makes the receiver send out a response message to all connected senders
  //it tells them who if anyone is currently casting and the id of the card that is being cast
  //when the card sender gets this broadcast, main.html changes 'cast' button to 'stop'
  var broadcast = function() {
    messageBus.broadcast(JSON.stringify({
      who: who,
      isCasting: isCasting,
      cardId: cardId
    }));
  };

  //default message and user when no one is casting
  $scope.text = '<h2>Welcome to CardCast!</h2><br/>Nothing has been casted yet...';
  // $scope.userMessage = '<div></div>'

  //initialize sets up the castReceiverManager, messageBus and all related functions
  var initialize = function() {
    cast.receiver.logger.setLevelValue(0);
    //create a global instance of the cast receiver manager and message bus
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting the Receiver Manager');
    window.messageBus = castReceiverManager.getCastMessageBus('urn:x-cast:pegatech.card.cast');
    console.log(castReceiverManager);

    //on ready event lets us know the receiver app has started
    castReceiverManager.onReady = function(event) {
      console.log('Recieved Ready event: ' + JSON.stringify(event.data));
      castReceiverManager.setApplicationState('Application status is ready...');
    };

    //whenever a new sender connects this broadcasts the casting status to all senders
    castReceiverManager.onSenderConnected = function(event) {
      console.log('Received Sender Connected event: ' + event.data);
      console.log(castReceiverManager.getSender(event.data).userAgent);
      broadcast();
    };

    //closes receiver app if there are no senders connected
    castReceiverManager.onSenderDisconnected = function(event) {
      console.log('Received Sender Disconnect event: ' + event.data);
      if (castReceiverManager.getSenders().length === 0) {
        window.close();
      }
    };


    //handler for castMessageBus event
    //when a new message occurs on the messageBus, parse the data from string to a JSON object
    //sanitize it to prevent malicious code from being entered, then compile the markdown
    //cast to screen and send a broadcast notifying all connected senders of change
    messageBus.onMessage = function(event) {

      console.log('Message [' + event.senderId + ']: ' + event.data);

      var message = JSON.parse(event.data);

      //if sender castCard was passed 'clear' parameter, this will reset to default
      //otherwise it is the text from the card
      $scope.text = $sanitize(Markdown.compile(message.card));
      $scope.userMessage = $sanitize(message.userMessage);

      //if castCard was passed 'clear', parameter, username and cardID will both be set to null
      //otherwise they will be the username, card ID and isCasting coerces TRUE value
      //this value is used by ng-show for the popup warning
      isCasting = !!message.username;
      who = message.username;
      cardId = message.cardId;

      $scope.color = message.color;
      console.log($scope.color);
      $scope.font = message.font;
      console.log($scope.font);

      broadcast();

      //update the scope
      $scope.$apply();
    };

    // start the receiver
    castReceiverManager.start({statusText: 'Application is starting'});
    console.log('Receiver Manager started');
  };

  if (!cast.receiver) {
    setTimeout(initialize, 1000);
  } else {
    initialize();
  }
})
.factory('Markdown', function() {
  var compile = function(text) {
    return marked(text);
  };
  return {
    compile: compile
  };
});
