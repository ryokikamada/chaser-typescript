# U16プログラミングコンテスト
## TypeScript版 CHaserライブラリ
[CHaser.ts](https://github.com/ryokikamada/chaser-typescript/blob/main/src/CHaser.ts)

## 準備

### node.jsをダウンロードし、インストールしてください。
[Node.js](https://nodejs.org/ja/)

### node.jsとnpmのバージョンを確認します。  
```
node -v
npm -v
```

### TypeScriptと@typesをインストールする。（最後の12はnode.jsのバージョンに合わせる）
```
npm install -g typescript @types/node@12
```

### promise-socketライブラリを使用します
```
npm install promise-socket
```

### tsconfig.jsonの準備
```
tsc --init
```

### tsconfig.jsonの修正
```
"sourceMap": true,
"outDir": ./dist,
```

## トランスパイル（TypeScript => JavaScript）
```
tsc
```


## 実行方法
```
node dist/sample.js
```

## クライアントコード
```TypeScript
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
```

### 周辺情報（client.value[] 配列）
周辺情報はゲットレディや行動の後に、client.value[]配列へ自動的に下記の数値が入ります。  

### 周辺情報の値の意味
| 値 | 意味 |
----|----
| 0 | なにもなし |
| 1 | 相手 |
| 2 | ブロック |
| 3 | アイテム |

### 方向
|左上|中上|右上|
|:---|:---:|---:|
|左中 |中中 |右中 |
|左下 |中下 |右下 |

### 配列
| client.value[0] | client.value[1] | client.value[2] |  
|:---|:---:|---:|
| client.value[3] | client.value[4] | client.value[5] |  
| client.value[6] | client.value[7] | client.value[8] |  

### ゲットレディ
```TypeScript
await client.get_ready();  
```

### ロジック記述
whileループの中にプログラムを書いてください。  
下記はひたすら上に歩き、相手がいたらPUTするプログラムです。
```TypeScript
while(true) {
    // Write your code here.
    await client.get_ready();
    if(client.value[1] == 1){
        await client.put_up();
    } else {
        await client.walk_up();
    }
}
```

### WALK
| メソッド | 意味 |
----|----
| await client.walk_up() | 上へ移動 |
| await client.walk_right() | 右へ移動 |
| await client.walk_left() | 左へ移動 |
| await client.walk_down() | 下へ移動 |

### LOOK
| メソッド | 意味 |
----|----
| await client.look_up() | 上を見る |
| await client.look_right() | 右を見る |
| await client.look_left() | 左を見る |
| await client.look_down() | 下を見る |

### SEARCH
| メソッド | 意味 |
----|----
| await client.search_up() | 上を探す |
| await client.search_right() | 右を探す |
| await client.search_left() | 左を探す |
| await client.search_down() | 下を探す |

### PUT
| メソッド | 意味 |
----|----
| await client.put_up() | 上に置く |
| await client.put_right() | 右に置く |
| await client.put_left() | 左に置く |
| await client.put_down() | 下に置く |

### 非同期処理
- JavaScript(TypeScript)はノンブロッキング処理です。  
- Socketを操作するためにpromise-socketライブラリを使用しています。  
- 各メソッドの前にawaitを必ず付けてください。
- awaitを含む関数の前には、asyncの記述が必要になります。
