import { exit } from "process";
import PromiseSocket from "promise-socket";

class CHaser {
    promiseSocket: any;
    response: any;
    chunkSize_atMark: number;
    chunkSize_response: number;
    value: number[];

    constructor() {
        this.promiseSocket = new PromiseSocket();
        this.response = "";
        this.chunkSize_atMark = 3;
        this.chunkSize_response = 12;
        this.value = [];
    }

    async socket(host:string, port: number, name: string)  {
        try {
            await this.promiseSocket.connect(port, host);
            await this.promiseSocket.writeAll(name);
            console.log(`connect: socket host:${host} port:${port} name:${name}`);
        } catch(e){
            console.error(`error: socket : ${e}`);
            exit();
        }
    }

    async get_atMark() {
        try{
            this.response = await this.promiseSocket.read(this.chunkSize_atMark);
            console.log(`response: ${this.response.toString().substring(0,1)}`);
        }catch(e){
            console.error(`error: get_atMark : ${e}`);
            exit();
        }
    }

    async get_ready() {
        try{
            await this.promiseSocket.writeAll("gr\r\n");
            this.response = await this.promiseSocket.read(this.chunkSize_response);
            console.log(`response: get_ready : ${this.response.toString().substring(0,10)}`);
            this.check_first_str();
            this.make_value();
        } catch(e) {
            console.error(`error: get_ready : ${e}`);
            exit();
        }
    }

    private async send_sharp() {
        await this.promiseSocket.writeAll("#\r\n");
    }

    private async get_response() {
        this.response = await this.promiseSocket.read(this.chunkSize_response);
        console.log(`response: action : ${this.response.toString().substring(0,10)}`);
        this.check_first_str();
        this.make_value();
    }

    private check_first_str(){
        if(this.response.toString()[0] == '0') {
            console.log("Exit: the first str == 0");
            exit();
        } else {
            console.log(`the first str == ${ this.response.toString()[0] }`);
        }
    }

    private make_value(){
        this.value = Array.from(this.response.toString().substring(1,10));
        console.log(`value : ${this.value}`);
    }

    // WALK
    async walk_up() {
        await this.action("wu\r\n")
    }
    async walk_right() {
        await this.action("wr\r\n")
    }
    async walk_left() {
        await this.action("wl\r\n")
    }
    async walk_down() {
        await this.action("wd\r\n")
    }

    // LOOK
    async look_up() {
        await this.action("lu\r\n")
    }
    async look_right() {
        await this.action("lr\r\n")
    }
    async look_left() {
        await this.action("ll\r\n")
    }
    async look_down() {
        await this.action("ld\r\n")
    }

    // SEARCH
    async search_up() {
        await this.action("su\r\n")
    }
    async search_right() {
        await this.action("sr\r\n")
    }
    async search_left() {
        await this.action("sl\r\n")
    }
    async search_down() {
        await this.action("sd\r\n")
    }

    // PUT
    async put_up() {
        await this.action("pu\r\n")
    }
    async put_right() {
        await this.action("pr\r\n")
    }
    async put_left() {
        await this.action("pl\r\n")
    }
    async put_down() {
        await this.action("pd\r\n")
    }

    private async action(order: string) {
        try{
            await this.promiseSocket.writeAll(order);
            await this.get_response();
            await this.send_sharp();
            await this.get_atMark();
        } catch(e) {
            console.error(`error: action ${order} : ${e}`);
            exit();
        }
    }
}

async function main() {

    const HOST = "127.0.0.1";
    const PORT  = 2009;
    const NAME = "Your Name";
    
    const client = new CHaser();
    
    try {
        await client.socket(HOST, PORT, NAME);
        await client.get_atMark();

        while(true) {
            await client.get_ready();
            await client.search_left();
        }
    } catch(e) {
        console.error(`error in main: ${e}`);
        exit();
    }
}

main();