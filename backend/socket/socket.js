const disconnect = require('./Events/disconnect');
const join_room = require('./Events/join_room');
const notification = require('./Events/notification');
const last = require('./Events/last');
const send_message = require('./Events/send_message');

module.exports.socketIO = (io) => {
    io.on("connection", (socket) => {

        socket.on("disconnect", (reason) => {
            disconnect(reason);
        })

        socket.on("join_room", (data) => {
            join_room(data, socket);
        });

        socket.on("notification", (data) => {
            notification(data, socket)
        })

        socket.on("last", (data) => {
            last(data);
        })

        socket.on("send_message", (data) => {
            send_message(data, io)
        });
    })

} 