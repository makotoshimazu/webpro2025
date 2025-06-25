import express from "express";
// 生成した Prisma Client をインポートする
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient({
  // 実行されるクエリをログに出力する設定
  log: ["query"],
});
const app = express();

// 環境変数 PORT があればそれを使い、なければ 8888 を使う
const PORT = process.env.PORT || 8888;

// ビューエンジンとして EJS を設定する
app.set("view engine", "ejs");
// EJS のテンプレートファイルが置かれているディレクトリを設定する
app.set("views", "./views");

// フォームから送信されたデータ（POSTリクエストのボディ）を解析するためのおまじない
app.use(express.urlencoded({ extended: true }));

// ルートパス ("/") へのGETリクエストに対する処理
app.get("/", async (req, res) => {
  // データベースから全ユーザーを取得する
  const users = await prisma.user.findMany();
  // 'index.ejs' テンプレートを描画して、'users' という名前でデータを渡す
  res.render("index", { users });
});

// "/users" へのPOSTリクエストに対する処理（ユーザー追加）
app.post("/users", async (req, res) => {
  const name = req.body.name; // フォームから送信された 'name' を取得
  if (name) {
    // 新しいユーザーをデータベースに作成する
    await prisma.user.create({
      data: { name },
    });
    console.log("新しいユーザーを追加しました:", name);
  }
  // 処理が終わったら、ルートパスにリダイレクト（再アクセスさせる）
  res.redirect("/");
});

// サーバーを指定したポートで起動する
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
