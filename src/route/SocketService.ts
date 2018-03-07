import { AppUtilities } from "../utilities/AppUtilities";
import { ApiConfig } from "../mapping/config";
export class SocketService {
    private socket;
    private io;

  
  /**
   * Constructor.
   *
   * @class SocketService
   * @constructor
   */
  constructor(socket:any,io:any) {
    this.socket =socket ;
    this.io =io ;

}
  /**
   * send function.
   *
   * @class SocketService
   * @send
   */
    public send(event:string,message: string): void {
        this.io.emit(event, message);
    }
  /**
   * sendRes function.
   *
   * @class SocketService
   * @sendRes
   */
  private sendRes(event:string,res: any): void {
    this.io.emit(event, res);
}
  /**
   * onEvent function.
   *
   * @class SocketService
   * @onEvent
   */
    public  onEvent(): void {
        this.socket.on('message', (m: string) => {
                console.log('[server](message): %s', JSON.stringify(m));
        });
        
        this.socket.on('informationRetrieval', async (reqObj: any) => {
            //console.log('informationRetrieval', JSON.stringify(reqObj));
            let options = 
            {
                method: 'GET',
                params: reqObj,
                dataType: 'json'		
            }
            let res=await AppUtilities.getInformation(ApiConfig.informationRetrieval,options);
            this.sendRes('informationRetrieval',res.body);
        });
    }
}

