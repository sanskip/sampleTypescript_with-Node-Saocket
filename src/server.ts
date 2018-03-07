import * as express from "express";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io-client';
const SERVER_URL = 'http://localhost:3005';


/**
 * The server.
 *
 * @class Server
 */
export class AppServer {

    public app: express.Application;
    private server: Server;
    private httpPort:string | number;
    private socket;
    /**
     * NodeJS the application.
     *
     * @class Server
     * @method inIt
     * @static
     * @return Returns the newly created INSTANCE for this app.
     */
    public static inIt(): AppServer {
        return new AppServer();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.createApp();
        this.createServer();
        this.listen();
        this.initSocket();
        this.send('hi');

    }
    /**
     * creating app
     *
     * @class Server
     * @method createApp
     */
    private createApp(): void {
        console.log('createApp')
        this.app = express();
    }
    /**
     * creating Http server
     *
     * @class Server
     * @method createServer
     */
    private createServer(): void {
        this.server = createServer(this.app);
        this.httpPort = this.normalizePort(process.env.PORT ||3006);
        //add error handler
        this.server.on("error", this.onError);

    }

    /**
     * server will listen on this port
     *
     * @class Server
     * @method listen
     */
    private listen(): void {
        this.server.listen(this.httpPort, () => {
            console.log('Running server on port %s', this.httpPort);
        });

    }
    /**
     * Normalize a port into a number, string, or false.
     */
    private normalizePort(val) {
        console.log('normalizePort')
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    private  onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }
        console.log('typeof this.httpPort',typeof this.httpPort)
        var bind = typeof this.httpPort === "string" ||typeof this.httpPort === "number"
            ? "Pipe " + this.httpPort
            : "Port " + this.httpPort;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }


    /**
     * sockets connection for server
     *
     * @class Server
     * @method sockets
     */
    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);

    }
    public send(message: string): void {
        this.socket.emit('message1', 'message1');
        this.socket.emit('message', message);
        this.socket.emit('informationRetrieval', {
            userID:'abc',
            companyName:'Growthlet',
            requestType:'plain_text',
            query:'mutual%20consent%20divorce%20under%20sunni%20muslim%20law'
        }		
    );
        this.socket.on('informationRetrieval', (res:any)=>{
            console.log('[client](message): %s', JSON.stringify(res));
        });
        this.socket.on('message', (m:string)=>{
            console.log('[client](message): %s', JSON.stringify(m));
        });
       
    }


}
const server = AppServer.inIt();
//module.exports = server;
