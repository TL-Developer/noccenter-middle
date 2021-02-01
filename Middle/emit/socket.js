module.exports = (server) =>{
    
    const sio = require("socket.io")(server, {
        handlePreflightRequest: (req, res) => {
            const headers = {
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": req.headers.origin,
                "Access-Control-Allow-Credentials": true
            };
            res.writeHead(200, headers);
            res.end();
        }
    });


    sio.on("connection", (socket) => {
        console.log("Connected!");

        socket.on('hello!', () => {
            console.log(`hello from ${socket.id}`);
        });
        
        socket.on('disconnect', () => {
            console.log(`disconnect: ${socket.id}`);
        });


    });

    sio.emit('message', "Sucesso");
    

    return sio;

}
