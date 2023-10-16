import * as signalR from "@microsoft/signalr";

const URL = "/hub";
class Connector {
    private connection: signalR.HubConnection;
    public events: (onQueueMessageReceived: (message: string) => void) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();

        console.log("connecting...")
        this.connect()

        this.events = (onQueueMessageReceived) => {
            this.connection.on("QueueMessageReceived", (message) => {
                onQueueMessageReceived(message);
            });
        };
    }

    public sendMessageToQueue = (message: string) => {
        if (this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("SendMessageToQueue", message).then(() => console.log(`SendMessageToQueue: ${message}`))
        }
        console.log(`Connection state: ${this.connection.state}`)
    }

    public connect = () => {
        try {
            this.connection.stop()
        }
        catch { /* empty */ }
        try {
            this.connection.start().then(() => console.log("connected")).catch(err => console.log(err));
        } catch { /* empty */ }
    }

    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}

export default Connector.getInstance;