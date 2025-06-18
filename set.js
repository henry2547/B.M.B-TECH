const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU96M1hNR0prZU9rQlFTSEZpdzlzNXRzU1lkaG9TTjBOREJCS3dDcmpXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGhnY0dzMCtPMTAxbzRGSzVHU2NZa0pSa3ZienpqQWhXS0s5eUNNRnloQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRFNrNXhCTEptU2FuNkN1amdRVDdHVTdDY0RRd281RGF4akNDTkdrN1ZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0NmdkdHpNb3cvdk5sOXErRXhhWjFVUzJLUGh5bmNWNHlzZDVJTFVuZzNzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCNWJNdVlydG9DSUhRWWpLN2dOZlNlV3RYMVBXcXpVRStaUnA0ZUUzSEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF4VFcyaDMyUzBMc3NjWXRHejZ5amZxb2RBbVM5bU9wRWUzbTc1MkxoRFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJtVTBDdlhnM1BUcUVVSnJVK255ZTllWlRSMUU2Vng4NUx5RG9PLzRFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkt3NUpnaFNEbWYvUldqTDkrS05nRUN3TzhRQkJxbllrMVZqeUZVVHpoND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZhRmw4WWdoYjMwSXFWQis1YVNKZVdDRkw0enlTNVFka2pMb3pEUWtOUmhyYW1XOVV4VmJObzNNU1hwYWxLVHA0TU5PUm5IZnl1Q2JYRHBIU3lNQkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzcsImFkdlNlY3JldEtleSI6InlPcjJrTUozQWY4cmFyYmRLVW9TQ2tBUlZYM2doVlFNZmsrcDFwaDNPVDg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0MTAzNDQ5MTc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNDOURFRDdCNDBCMkY5RDk0NDc0N0U5QUI4MDgyNkEwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDg3OTYwNDF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDEwMzQ0OTE3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3REI5NTcyNjUyNDAwODNGMzA4RDYzMTVFNkYxNEMyQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4Nzk2MDQxfV0sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGWThKQTc2QSIsIm1lIjp7ImlkIjoiMjU0MTAzNDQ5MTc2OjQ5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiOTM4NDkwNjIwMzE3OTo0OUBsaWQiLCJuYW1lIjoi8J+MtPCfpbfwn6upIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOeTkvT3NERVBhRThzRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJpR0FkYmZUSnNyOTY3dFFDQnhmOEZYV29FZXdJbjdHb3YyVVFMcWJncTN3PSIsImFjY291bnRTaWduYXR1cmUiOiJnQTBOR3l5MytNVGtDWEF3VUtSUm1SWDlIUkdvVjVOM3ZnWlhSUUtJMi9IbzVrZS9wVzRiTVpEUGFBZnJWZFFEV09uNHNzbW9samxITTVxaGdSejFEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSy81NmVKdEUyOE9aREd1OVZ5cG1XL00xaUE4SytvbGtxdktaNlZqeTJqMmZkbVlyOWRwcUpvOVl4R1VlVUk0UzVvT09sV0ZUYy94RzZPT0VDKzB1Qmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMDM0NDkxNzY6NDlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWWhnSFczMHliSy9ldTdVQWdjWC9CVjFxQkhzQ0oreHFMOWxFQzZtNEt0OCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4Nzk2MDM2LCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZlTyJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

