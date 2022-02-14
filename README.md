# U16プログラミングコンテスト
# CHaserライブラリ(TypeScript版)

## 準備

### nodeをダウンロードし、インストールする。  
```
node -v
npm -v
```

### TypeScriptと@typesをインストールする。（最後の12はnodeのバージョンに合わせる）
```
npm install -D typescript @types/node@12
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
node dist/CHaser.js
```

## mainループ
```TypeScript
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

### client.value[] 配列
client.get_ready(), client.action_direction()の後にclient.value[]に自動的に値が入ります。  

### 情報
| 値 | 意味 |
----|----
| 0 | なにもなし |
| 1 | 相手 |
| 2 | ブロック |
| 3 | アイテム |

### 方向
|場所|場所|場所|
|:---|:---:|---:|
|左上|中上|右上|
|左中 |中中 |右中 |
|左下 |中下 |右下 |

### 配列
| client.value[0] | client.value[1] | client.value[2] |  
|:---|:---:|---:|
| client.value[3] | client.value[4] | client.value[5] |  
| client.value[6] | client.value[7] | client.value[8] |  
  
### ロジック記述
while(true){} ループの中に行動を書いてください。  

### ゲットレディ
```TypeScript
await client.get_ready();  
```

### ウォーク
| メソッド | 意味 |
----|----
| await client.walk_up() | 上へ移動 |
| await client.walk_right() | 右へ移動 |
| await client.walk_left() | 左へ移動 |
| await client.walk_down() | 下へ移動 |

### ルック
| メソッド | 意味 |
----|----
| await client.look_up() | 上を見る |
| await client.look_right() | 右を見る |
| await client.look_left() | 左を見る |
| await client.look_down() | 下を見る |

### サーチ
| メソッド | 意味 |
----|----
| await client.search_up() | 上を探す |
| await client.search_right() | 右を探す |
| await client.search_left() | 左を探す |
| await client.search_down() | 下を探す |

### プット
| メソッド | 意味 |
----|----
| await client.put_up() | 上に置く |
| await client.put_right() | 右に置く |
| await client.put_left() | 左に置く |
| await client.put_down() | 下に置く |



### 非同期処理
JavaScript(TypeScript)はノンブロッキング処理です。  
Socketを操作するためには、非同期処理が必要になります。非同期処理のため、promise-socketライブラリを使用しています。  
Promise処理のシンタックスシュガー async、awaitを使用。メイン関数の前にasyncと記述。awaitをPromise処理の前に必ず書いてください。  
