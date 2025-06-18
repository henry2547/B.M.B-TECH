const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZCdEx5YkRKTDl1N0FMeitFemlqTDNMTG4xbDVCZHo4VEtxUDRpNzBrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWpjYnRnYStsM3ZvRDBzazYzTk9wc1ZSbDBiaW5vNk9JSGZyNDJpaHlsQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSW01c2NOQ1dqL1VOdnNOTHJJMFJnVjl0amxuaHdaNjUvR09VeGt5QVZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvc1d0OENtUkJwNmFHQzd3Z2VvT3JuMWZrYm11L2RqRzBOMHp3TUxkZlNRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllEVEY4eCs2NEZMODRjNFV0L0dpVVFWZFhEczdyYkt5bUZhQW9ma0cwMjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii82aTloUktaQ0UvS3J1NHIvdEh2cG1tNFcrQVFqQ1ZNNkFEQmQrOUhuVzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkNHVUg2Yjh0THRZY1RnN1hkQ0hUaFQyVUdZN1pOSjlLTzhybTBWSUoyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmF2NEd4ZVRuVEVSMlI2OGthU1JpNTE3dGhQalM5dFhZdTBnY1NMMHh3MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp0MWdKRFd6VGkyaFpyTVovQm1rTGtxS0RQdmkySUsrTmU1MUdsZkRCeFR6cS9SWFVHVDh0M2crbVhtaWtIR3c3Nmg2Tmd1QnVGN0NaVDBMV05uWUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc4LCJhZHZTZWNyZXRLZXkiOiJOdGFXVFFrV0V1SUNlUmZXcU1nUVFtWmphTitGck9hWStzclYxek5xY293PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDEwMzQ0OTE3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDRTRFMEVEODdDM0Q0NjA1QjA2REIwRkNGQzc5RTVFNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMjYyNDIxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQxMDM0NDkxNzZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjRCMTQzNkE0RjM1NkI0Q0VEOUZFNzNEODZFQjc3QjQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDI2MjQyM31dLCJuZXh0UHJlS2V5SWQiOjMyLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzIsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiQlhOOEVWVEIiLCJtZSI6eyJpZCI6IjI1NDEwMzQ0OTE3Njo1MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjkzODQ5MDYyMDMxNzk6NTJAbGlkIiwibmFtZSI6IvCfkIoifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ04yOS9Pc0RFSUxGeThJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImlHQWRiZlRKc3I5Njd0UUNCeGY4RlhXb0Vld0luN0dvdjJVUUxxYmdxM3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZaQ3dway83Q0NFK2RBM2ljUUtvaXEvQ3ZGRUY1VjQxTTQ4bXROUElHdEw5QmdQTHNyRUVWRGw0Q2h1NHRYMHZyY09nVGszTkt2R3Z0MjRVczBhOUFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJKNWg3b0VicFAxNkVZUTJNRVVURXVDMGRyZ2F6T29zaGx2WkdBMTd4L1VDVCs0VFAyQ2l0dzZ1TFNaV2dKRVhRY09QakZ5MVVkaHk3YzJ6NHIxajFDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwMzQ0OTE3Njo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZaGdIVzMweWJLL2V1N1VBZ2NYL0JWMXFCSHNDSit4cUw5bEVDNm00S3Q4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTAyNjI0MTUsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRmVTIn0=',
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

