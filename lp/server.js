import express from "express";
const app = express()

class EventEmitter {

    listeners = {};

    fire(event) {
        for (var k in this.listeners) {
            let listener = this.listeners[k];
            this.unregister(k); // unregister this listener
            listener(event);
        }
    }

    register(id, listener) {
        this.listeners[id] = listener;
        console.log("Register", id)
    }
    
    unregister(id) {
        return delete this.listeners[id];
    }
}

const eventEmitter = new EventEmitter();

app.get('/', function (req, res) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   const id = Date.now().toString(); // milliseconds of now will be fine for our case
   var timer = null;
   const handler = function(event) {
      clearTimeout(timer);
      console.log('event', event);
      res.status(201);
      res.end( JSON.stringify(event));
   };

   eventEmitter.register(id, handler);
   timer = setTimeout(function(){ 
      console.log('timeout');
      const wasUnregistered = eventEmitter.unregister(id);
      console.log("wasUnregistered", wasUnregistered);
      if (wasUnregistered){
         res.status(200);
         res.end();
      }
   }, 5000);
});


async function sleep(ms) {
   return new Promise((resolve) => {
     setTimeout(resolve, ms);
   }).catch(function() {});
 }   


 async function main() {
   while (true) {
      const waitTimeMS = Math.floor(Math.random() * 10000);
      await sleep(waitTimeMS);
      eventEmitter.fire({time: waitTimeMS});
   }
 }
 

 var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
    main();
 })