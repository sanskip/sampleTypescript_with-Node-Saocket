import { Db } from 'mongodb'
import { MongoDbConnection } from "../config/MongoDbConfig";
import { MongoDbConfig } from "../mapping/dbConfig";
/**
 * Constructor
 *
 * @class AppDaos
 */
export class AppDaos {
      private mongoConnection;

  /**
   * Constructor
   *
   * @class AppDaos
   * @constructor
   */
  constructor() {;
    let mongoDbConnection=new MongoDbConnection();
    this.mongoConnection=mongoDbConnection.getConnection();
    setTimeout(()=>{
      this.mongoConnection=mongoDbConnection.getConnection();
    },2000);



  }



  /**
   * get method of service.
   *
   * @return void
   */
  public async get() {
    console.log('get daos');
    let data=await this.mongoConnection.collection(MongoDbConfig.collectionname).find().limit(1).toArray();
    //console.log('data',data);
  }
}
