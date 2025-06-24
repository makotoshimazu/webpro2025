import express from "express";
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // クエリが実行されたときに実際に実行したクエリをログに表示する設定
  log: ["query"],
});
const app = express();

// 環境変数が設定されていれば、そこからポート番号を取得する。環境変数に設定がなければ 8888 を使用する。
const PORT = process.env.PORT || 8888;

// EJS をテンプレートエンジンとして設定
app.set("view engine", "ejs");
app.set("views", "./views");

// form のデータを受け取れるように設定
app.use(express.urlencoded({ extended: true }));

// ルートハンドラー
app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.render("index", { users });
});

// ユーザー追加ハンドラー
app.post("/users", async (req, res) => {
  const name = req.body.name; // フォームから送信された名前を取得
  const age = Number(req.body.age); // フォームから送信された年齢を取得。
  if (isNaN(age)) {
    console.error("年齢は数値でなければなりません。");
    res.status(400).send("年齢は数値でなければなりません。");
    return;
  }
  if (name) {
    const newUser = await prisma.user.create({
      data: { name, age }, // 年齢も保存
    });
    console.log("新しいユーザーを追加しました:", newUser);
  }
  res.redirect("/"); // ユーザー追加後、一覧ページにリダイレクト
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
