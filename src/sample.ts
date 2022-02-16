
import CHaser from "./CHaser";

async function main() {

    const HOST = "127.0.0.1";
    const PORT  = 2009;
    const NAME = "Your Name";
    
    const client = new CHaser();
    
    try {
        await client.socket(HOST, PORT, NAME);
        await client.get_atMark();

        while(true) {
            // Write your code here.
            await client.get_ready();
            await client.search_left();
        }
    } catch(e) {
        console.error(`main : ${e}`);
    }
}

main();