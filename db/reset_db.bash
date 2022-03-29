$(> db/ladda.sqlite)
cat db/migrate.sql | sqlite3 db/ladda.sqlite
cat db/seed.sql | sqlite3 db/ladda.sqlite
