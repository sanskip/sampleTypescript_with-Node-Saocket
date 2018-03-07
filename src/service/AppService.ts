import { AppDaos } from "../daos/AppDaos";
import { AppUtilities } from "../utilities/AppUtilities";


/**
 * Constructor
 *
 * @class AppService
 */
export class AppService {


  private appDaos=new AppDaos();
  private appUtilities=new AppUtilities();

  /**
   * Constructor
   *
   * @class AppService
   * @constructor
   */
  constructor() {
    //initialize variables

  }



  /**
   * get method of service.
   *
   * @return void
   */
  public get():void {
    console.log('get service');
    this.appDaos.get();
    this.appUtilities.utilities();
  }
}
