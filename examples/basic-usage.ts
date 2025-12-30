import {
    RootContext,
    RouterInterfaceSchema
} from '../src/index.js';

import type {
    IRouterClient,
    IPAddress
} from '../src/index.js';

class MyConsoleClient implements IRouterClient {
    async execute(command: string, args?: any): Promise<any> {
        console.log(`[RealClient] Sending Command: ${command}`, args);

        if (command === '/interface/print') {
            return [
                {
                    id: '*1',
                    name: 'ether1',
                    type: 'ether',
                    running: true,
                    disabled: false,
                    mtu: 1500,
                    'mac-address': '00:00:5E:00:53:AF'
                }
            ];
        }
        return [];
    }

    listen(command: string, args: any, callback: (data: any) => void): () => void {
        console.log(`[RealClient] Listening on: ${command}`);
        return () => console.log('Unsubscribed');
    }

    connect() { return Promise.resolve(); }
    disconnect() { return Promise.resolve(); }
    getInterface() { return Promise.resolve(null); }
    getInterfaces() { return Promise.resolve([]); }
    query() { return new RootContext(this); }
}

async function main() {
    console.log("--- Testing ros-strongtypes Integration ---\n");

    const client = new MyConsoleClient();
    const query = new RootContext(client);

    console.log("1. Fetching Interfaces...");
    const interfaces = await query.interface().print();
    // Validate the result using the exported schema to double check
    console.log("Result:", interfaces);

    console.log("\n2. Fetching System Identity...");
    const identity = await query.system().identity().print();
    console.log("System Identity:", identity);

    console.log("\n3. Managing DHCP Leases...");
    const leases = await query.ip().dhcp().server().lease().print();
    console.log("Found leases:", leases.length);

    console.log("\n4. Configuring Firewall...");
    await query.ip().firewall().filter().add({
        chain: 'input',
        action: 'drop',
        'src-address': '192.168.88.100',
        comment: 'Drop suspicious traffic'
    });

    console.log("\n5. Toggling Resources...");
    await query.interface().ethernet().disable('*1');
    await query.interface().ethernet().enable('*1');

    console.log("\n--- Test Finished ---");
}

main();
