import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
import { AppService } from "../service/AppService";
import { Validate } from "../utilities/Validate";
import { RequestedType,validationSchema } from "../mapping/validationSchema";
//import {io} from "../index";

/**
 * / route
 *
 * @class Route
 */
export class AppRoute  {
   

  /**
   * Create the routes.
   *
   * @class Route
   * @method create
   * @static
   */
  //@validate1()
  public static create(router: Router):void {
    console.log('create');
    //initialize th route class
      let route=new AppRoute();
      let appService=new AppService();
      //io.emit('message', 'm123');
    //   socket.socket.on('message1', (m: string) => {
    //     console.log('[server](message1): %s', JSON.stringify(m));
        
    // });
    //log
    console.log("[Route::create] Creating  route.");
    router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
      console.log('route get')
      let isValidate=Validate.validate(req,[validationSchema.type1,validationSchema.type1,validationSchema.type1],RequestedType.HEADERS,RequestedType.BODY,RequestedType.PARAM);
      if(!isValidate.err){
        route.index(req, res, next);
      }else{
        appService.get();
      }

    //  route.index(req, res, next);
    });
    router.post("/", (req: Request, res: Response, next: NextFunction) => {
      route.index(req, res, next);
    });
    router.post("*", (req: Request, res: Response, next: NextFunction) => {
      route.index(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
  //  super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction):void {
    //console.log('index')
    //set custom title
    //this.title = "Home | Tour of Heros";

    //set options
    let data: Object = {
      "message": "Welcome to the Node App"
    };

    //send Response
    BaseRoute.sendResponse(res, data);
  }
}
