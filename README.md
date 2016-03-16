# SHIZUKU - 雫
データベースからデータレポートを簡単に出力するためのレポーティングフレームワーク

## セットアップ
現状のサンプルを動かすにはPostgreSQLが必要です。

```bash
# サンプルデータの作成
cd sample
ruby create_data.rb

# サンプルデータの登録
psql <database> < create_table.sql
psql <database> < users_data.sql
psql <database> < transaction_data.sql

# サーバの設定・起動
npm install
npm start
```
