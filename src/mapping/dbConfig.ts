export const MongoDbConfig:any ={
      connectionurl:process.env.URl|| "mongodb://localhost:27017",
      dbname:process.env.DBNAME|| "clientData",
      collectionname: process.env.COLLECTION|| "data"

};
