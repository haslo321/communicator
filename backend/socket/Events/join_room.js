const prisma = require("../../prisma/index");


module.exports = (data, socket) => {

    prisma.rooms.findUnique({
        where: {
            id: data.roomId
        }
    })
        .then(result => {


            const sockets = [...socket.rooms]
            sockets.shift()

            sockets.forEach(singleRoom => {
                socket.leave(singleRoom);
            })

            socket.join(result.room);
            return prisma.messages.findMany({
                where: {
                    roomId: data.roomId
                }
            })
        })
        .then((result) => {
            socket.emit("receive_message", {
                data: result,
                senderID: data.userId
            });
        })
        .catch(err => {
            console.log(err);
        })


}