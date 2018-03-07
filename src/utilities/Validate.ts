import { NextFunction, Request, Response } from "express";
//import { BaseRoute } from "../route/BaseRoute";
/**
 * Constructor
 *
 * @class Validate
 */
export class Validate {
private data:any;


  /**
   * Constructor
   *
   * @class Validate
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
  public static validate(req: Request,validationSchema: Array<any>,... requestedType: Array<any>):any {
    let validate=new Validate();
    let isValidate={"err":false};
    if(validationSchema.length==requestedType.length){
      let query=req.query;
      let headers=req.headers;
      let param=req.params;
      let body=req.body;
      for(let index in  requestedType){

        if(requestedType[index]=='headers'){

          isValidate.err=validate.isValidate(validationSchema[index],headers)

        }else if(requestedType[index]=='param'){

          isValidate.err=validate.isValidate(validationSchema[index],param)

        }else if(requestedType[index]=='body'){

          isValidate.err=validate.isValidate(validationSchema[index],body)

        }else if(requestedType[index]=='query'){

          isValidate.err=validate.isValidate(validationSchema[index],query)

        }
        if(!isValidate.err){
          isValidate.err=false;
          break;
        }
      }
      isValidate['headers']=headers;
      isValidate['query']=query;
      isValidate['body']=body;
      isValidate['params']=param;

    }
    return isValidate;
  }
  private isValidate(type:any,headers:any){
    console.log('isValidate');
    //return false;
    return true;
  }

}
