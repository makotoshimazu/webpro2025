// Node.jsに標準で備わっているhttpモジュールとurlモジュールを読み込む
const http = require("http");
const url = require("url");

// 環境変数 PORT が設定されていればその値を、なければ8888をポートとして使用する
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // アクセスされたURLを解析して、パス名やクエリパラメータを取得する
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // レスポンスのヘッダーを設定する。文字コードをUTF-8に指定
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // URLのパスによって処理を分岐する
  if (path === "/") {
    // ルートパス ("/") にアクセスがあった場合の処理
    console.log("ルートパスへのアクセスがありました。");
    res.statusCode = 200; // ステータスコード 200 (成功) を設定
    res.end("こんにちは！"); // "こんにちは！" という文字列を返す
  } else if (path === "/ask") {
    // "/ask" パスにアクセスがあった場合の処理
    console.log("/ask パスへのアクセスがありました。");
    const question = query.q || "質問なし"; // クエリパラメータ 'q' の値を取得。なければ '質問なし'
    res.statusCode = 200;
    res.end(`Your question is '${question}'`); // 質問内容を返す
  } else {
    // それ以外のパスにアクセスがあった場合の処理
    console.log("未定義のパスへのアクセスがありました: " + path);
    res.statusCode = 404; // ステータスコード 404 (Not Found) を設定
    res.end("ページが見つかりません");
  }
});

// 指定したポートでサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(
    `サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}/ で待機中...`
  );
});
