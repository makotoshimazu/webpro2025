// Prismaが生成してくれたPrisma Clientをインポートする
import { PrismaClient } from "./generated/prisma/client";

// Prisma Clientのインスタンスを作成する
const prisma = new PrismaClient({
  // Prismaが実行するクエリをコンソールにログ出力するための設定じゃ
  log: ["query"],
});

// 非同期処理のためのメイン関数を定義する
async function main() {
  console.log("Prisma Client を初期化しました。");

  // データベースから全てのユーザーを取得して表示する
  let users = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", users);

  // 新しいユーザーをデータベースに追加する
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // もう一度、全てのユーザーを取得して表示する
  users = await prisma.user.findMany();
  console.log("After ユーザー一覧:", users);
}

// main関数を実行する
main()
  .catch((e) => {
    // もし途中でエラーが起きたら、内容を表示する
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 処理が終わったら（成功しても失敗しても）、データベースとの接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });
