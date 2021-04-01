import http from "k6/http";
import { check } from "k6";
import ws from "k6/ws";
import { extend, replace, isUndefined } from "./utils.js";

function WebsocketApi(options) {
    options = extend({}, options);

    this.wsOpen = function (socket) {
        socket.on('open', function open() {
            console.log('connected');
            socket.send(Date.now());

            socket.setInterval(function timeout() {
                socket.ping();
                console.log("Pinging every 1sec (setInterval test)");
              }, 1000);
        });
    };

    this.wsPing = function (socket) {
        socket.on('ping', function () {
            console.log("PING!");
          });
    };

    this.wsPong = function (socket) {
        socket.on('pong', function () {
            console.log("PONG!");
          });
    };

    this.wsMessage = function (socket) {
        socket.on('message', function (e) {
            console.log("Message Received "+e)
         });
    };

    this.wsClose = function (socket) {
        socket.on('close', function close() {
            console.log('disconnected');
          });
    };

    this.wsError = function (socket) {
        socket.on('error', function (e) {
            if (e.error() != "websocket: close sent") {
              console.log('An unexpected error occured: ', e.error());
            }
          });
    };

    this.wsSetTimeout = function (socket) {
        socket.setTimeout(function () {
            console.log('2 seconds passed, closing the socket');
            socket.close();
          }, 2000);
    };


};

module.exports = { WebsocketApi };
