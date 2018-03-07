import { MongoDbConfig } from "../mapping/dbConfig";
import {Db,MongoClient}  from "mongodb";

/**
 * / Db Connection
 *
 * @class MongoDbConnection
 */
export class MongoDbConnection  {
    private isConnection;
/**
   * Constructor
   *
   * @class MongoDbConnection
   * @constructor
   */
  constructor() {
  }
  /**
   * Create the routes.
   *
   * @class MongoDbConnection
   * @method connection
   * @static
   */
  //@validate1()
  private async connection():Promise<Db> {
    try{
      let client = await MongoClient.connect(MongoDbConfig.connectionurl);
      this.isConnection=client.db(MongoDbConfig.dbname);
    }catch(err){
      console.log(err)
    }
    return this.isConnection;

  }

    /**
     * Create the routes.
     *
     * @class MongoDbConnection
     * @method getConnection
     * @static
     */
    //@validate1()
    public  getConnection() {
      //let mongoDbConnection=new MongoDbConnection();
      //console.log('this.isConnection',this.isConnection)
      if(!this.isConnection){
        //console.log('if');
          return this.connection();
      }else{
        //console.log('else');
        return this.isConnection;
      }
    }
}
