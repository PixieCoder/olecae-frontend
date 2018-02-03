(function () {
  console.log("Entered JS");


  function setupSendHandle() {
    var conn = new WebSocket('ws://olecae.docker:2345');
    conn.onopen = function (e) {
      console.log("Connection established");
    };
    conn.onmessage = function (e) {
      console.log(e.data);
    };

    return function(e) {
      console.log("Transmitting...");
      conn.send('Button pressed');
    }
  }

  window.sendHandle = setupSendHandle();

})();
