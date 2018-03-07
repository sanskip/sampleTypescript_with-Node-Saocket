import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as compression from "compression";
import { AppRoute } from "./route/AppRoute";
import * as socketIo from 'socket.io';
import { createServer, Server } from 'http';
import { SocketService } from "./route/SocketService";


/**
 * The server.
 *
 * @class Server
 */
export class AppServer {

  public app: express.Application;
  private router: express.Router;
  private io: SocketIO.Server;
  private server: Server;
  private httpPort:string | number;
  /**
   * NodeJS  application.
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
      this.config();
      this.routes();
      this.sockets();
      this.listen();
      this.socketConfig();
      this.socketEventRouting();

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
         this.httpPort = this.normalizePort(process.env.PORT ||3005);
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

        var bind = typeof this.httpPort === "string"
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
   * server will listen on this port
   *
   * @class Server
   * @method listen
   */
 //  private listen():void {
 //    this.app.listen(3005, '0.0.0.0', () => {
 //    console.log('server is listening on :::: '+ 3005);
 // });
 //  }
    /**
     * sockets connection for server
     *
     * @class Server
     * @method sockets
     */

    private sockets(): void {
        this.io = socketIo(this.server);
        //this.io.set('origins', '*')
    }
/**
   * Configure application
   *
   * @class Server
   * @method socketConfig
   */
  private socketConfig():void {
    this.io.use((socket, next) => {
        console.log('middleware')
        next();
      });
  
  }
/**
   * Configure application
   *
   * @class Server
   * @method socketEventRouting
   */
  private socketEventRouting():void {
      this.io.on('connect', (socket: any) => {
        console.log('Connected client on port %s.', this.httpPort);
        let socketService=new SocketService(socket,this.io);
        socketService.send('message','m1');
        socketService.send('message1','m2');
        socketService.onEvent();
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
  }
  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  private config():void {
    console.log('config');
    //compress response object
  this.app.use(compression());
  //handle cross origin
  this.app.use(cors());
    //add static paths
  this.app.use(express.static(path.join(__dirname, "public")));

  //use json form parser middlware
  this.app.use(bodyParser.json({limit: "25mb"}));

  //use query string parser middlware
  this.app.use(bodyParser.urlencoded({limit: "25mb",
    extended: true
  }));

  //use cookie parser middleware
  this.app.use(cookieParser("SECRET_GOES_HERE"));

  //catch 404 and forward to error handler
  this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    //cors apply//
	   res.header("Access-Control-Allow-Origin", "*");
		 res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
		 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    res.setHeader('Content-Type', 'application/json'); //set common resp format//
      err.status = 404;
      next(err);
  });

  }

  /**
    * Create router.
    *
    * @class Server
    * @method config
    * @return void
    */
  private routes():void {
    console.log('routes')
    // let router: express.Router;
    // router = express.Router();
    this.router = express.Router();

    //IndexRoute
    AppRoute.create(this.router);

    //use router middleware
    this.app.use(this.router);
  }

}
//const server = AppServer.inIt();
//module.exports = server;
