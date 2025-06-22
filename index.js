import http from "node:http";

// 環境変数で指定されたポート、もしくは8888番ポートを利用する
const PORT = process.env.PORT || 8888;

const server = http.createServer((req, res) => {
  // リクエストURLをパースするため、URLオブジェクトを生成する
  // new URL()には完全なURLが必要なため、ダミーのベースURLを渡している
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // レスポンスヘッダーにContent-Typeと文字コード(UTF-8)を設定する
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // パスに応じて処理を分岐する
  if (pathname === "/") {
    console.log("ルートパス `/` へのリクエストを処理します。");
    res.statusCode = 200; // 成功のステータスコード
    res.end("こんにちは！");
  } else if (pathname === "/ask") {
    const question = url.searchParams.get("q");
    console.log(`/ask パスへのリクエストを処理します。質問: ${question}`);
    res.statusCode = 200;
    res.end(`Your question is '${question}'`);
  } else {
    console.log(`未定義のパス \`${pathname}\` へのリクエストがありました。`);
    res.statusCode = 404; // 見つからないのステータスコード
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(
    `サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}/ で待機中です...`
  );
});
