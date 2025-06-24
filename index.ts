import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  //
  log: ["query"],
});

async function main() {
  // Prisma Client を使ってデータベースに接続
  console.log("Prisma Client を初期化しました。");

  // ユーザーを取得
  const users = await prisma.user.findMany();
  console.log("ユーザー一覧:", users);
  // ユーザーを追加
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);
}

// main 関数を実行する。エラーが発生した場合は、エラーメッセージを表示し、Prisma Client を切断する。
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });
