angular.module('cardcast-receiver', [])
.controller('MainController', function($scope) {

  $scope.text = 'Nothing casted yet.';

  var initialize = function() {
    cast.receiver.logger.setLevelValue(0);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting the Receiver Manager');

    //on ready event
    castReceiverManager.onReady = function(event) {
      console.log('Recieved Ready event: ' + JSON.stringify(event.data));
      castReceiverManager.setApplicationState('Application status is ready...');
    };

    //handler for sender connected event
    castReceiverManager.onSenderConnected = function(event) {
      console.log('Received Sender Connected event: ' + event.data);
      console.log(castReceiverManager.getSender(event.data).userAgent);
    };

    //handler for sender disconnect, check if anyone is still connected and close if not
    castReceiverManager.onSenderDisconnected = function(event) {
      console.log('Received Sender Disconnect event: ' + event.data);
      if (castReceiverManager.getSenders().length === 0) {
        window.close();
      }
    };

    //create message bus for controller
    window.messageBus = castReceiverManager.getCastMessageBus('urn:x-cast:pegatech.card.cast');

    //handler for castMessageBus event
    messageBus.onMessage = function(event) {
      //set the event.data to $scope.text so it can be used by the view
      $scope.text = event.data;

      console.log('Message [' + event.senderId + ']: ' + event.data);
      castReceiverManager.setApplicationState(event.data);

      //inform all senders on messagebus of incoming message
      //this invokes the senders messageListener function
      messageBus.send(event.senderId, event.data);
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
});
