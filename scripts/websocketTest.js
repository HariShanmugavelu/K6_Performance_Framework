import ws from "k6/ws";
import { check } from "k6";
import { commonsData } from '../conf/websocketConf.js';
import { isUndefined } from '../utils/utils.js';
import { WebsocketApi } from '../utils/websocket.js'
import { Trend } from 'k6/metrics';

let websocketResponseTrend = new Trend('websocketResponseTrend');

export let options = {
	vus: commonsData.generalData.users,
	rps: commonsData.generalData.requestsPerSecond,
	duration: commonsData.generalData.loadDuration + 's',
	
};

//Creating object for WebsocketApi
const websocket = new WebsocketApi();

export default function() {
  let url = commonsData.generalData.websocketEndpoint;
  let params = commonsData.generalData.params;
  const startTime = new Date().getTime();

  //Connection to Websocket 
  let websocketResponse = ws.connect(url, params, function (socket) {

    if(isUndefined(params)) {
        websocket.wsOpen(socket);
    }
    else {
      websocket.wsOpen(socket);
    }
   
    //Testing various methods in Websocket
    websocket.wsPing(socket);
    websocket.wsPong(socket);
    websocket.wsMessage(socket);
    websocket.wsClose(socket);
    websocket.wsError(socket);
    websocket.wsSetTimeout(socket);
    
  });
  
  //Checking the status of the Websocket response
  check(websocketResponse, { "status is 101": (r) => r && r.status === 101 });
  const endTime = new Date().getTime();

  //Elapsed time for the websocket operations
  if(websocketResponse.status === 101) {
    const elapsedTime = endTime - startTime;
    websocketResponseTrend.add(elapsedTime);
  }
};

