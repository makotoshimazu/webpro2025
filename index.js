// node.js の標準ライブラリである http と url を 'node:' をつけてインポートする
import http from "node:http";
import { URL } from "node:url";

// 環境変数 'PORT' があればそれを使い、なければ 8888 番ポートを使う
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // リクエストのURLをパース（解析）して、扱いやすくする
  // 'http://' + req.headers.host は、URLのドメイン部分を補完するためのおまじないじゃ
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // レスポンスヘッダーに、文字コードがUTF-8であることを設定する
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // URLのパス名（ドメイン以降の部分）によって処理を分ける
  if (parsedUrl.pathname === "/") {
    // ルートパス '/' にアクセスされた場合
    console.log("ルートパスへのアクセスがありました。");
    res.writeHead(200); // ステータスコード 200 (成功) を返す
    res.end("こんにちは！");
  } else if (parsedUrl.pathname === "/ask") {
    // '/ask' パスにアクセスされた場合
    console.log("/ask パスへのアクセスがありました。");
    // クエリパラメータ 'q' の値を取得する
    const question = parsedUrl.searchParams.get("q");
    res.writeHead(200);
    res.end(`Your question is '${question}'`);
  } else {
    // それ以外のパスにアクセスされた場合
    console.log("未定義のパスへのアクセスがありました。");
    res.writeHead(404); // ステータスコード 404 (見つからない) を返す
    res.end("ページが見つかりません");
  }
});

// 指定したポートでサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(
    `サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}/`
  );
});
