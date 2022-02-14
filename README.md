# chaser-typescript

実行方法
```TypeScript:実行方法
node dist/CHaser.js
```

mainループ
```TypeScript:main()
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
```

while(true){} ループの中に行動を書いてください。
ゲットレディ： await client.get_ready();

JavaScript(TypeScript)はノンブロッキング処理です。
Socketを操作するためには、非同期処理が必要になります。非同期処理のため、promise-socketライブラリを使用しています。
Promise処理のシンタックスシュガー async、awaitを使用。メイン関数の前にasyncと記述。awaitをPromise処理の前に必ず書いてください。

