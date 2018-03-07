import * as requestify from 'requestify';
/**
 * Constructor
 *
 * @class AppDaos
 */
export class AppUtilities {


  /**
   * Constructor
   *
   * @class AppDaos
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
  public  utilities():void {
    console.log('get AppUtilities');
    try{

    }catch{

    }
  }
  
  /**
   * get method of service.
   *
   * @return void
   */
  public static async getInformation(url:string,options:any) {
    console.log('get AppUtilities');
    try{
      return await requestify.request(url, options);
      }catch(err){
      console.log(err)
      
    }
  }
}
