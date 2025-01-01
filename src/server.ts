import express, {json, urlencoded, Request, Response} from "express";
import cors from "cors";
import 'dotenv/config';
import morgan from "morgan";
import { PrismaClient } from '@prisma/client';
import Memcached from 'memcached';
import amqp from 'amqplib/callback_api';
import api from "./routes/api";

const app = express();
const port = process.env.port || 4000;
const whiteListedAddresses = [
  "http://localhost:3000",
];

app.use(json());
app.use(urlencoded({extended: true}))
app.use(cors({ origin: whiteListedAddresses, credentials: true }));
app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`
  )
);

app.get('/health', async (req: Request, res: Response) => {
  try {
    // Check server status
    const serverStatus = 'OK';

    // Check database status
    const databaseStatus = await checkDatabaseConnection();

    // Check cache status
    const cacheStatus = await checkCacheConnection();

    // Check message broker status
    // const messageBrokerStatus = await checkMessageBrokerConnection();

    res.status(200).json({
      server: serverStatus,
      database: databaseStatus,
      cache: cacheStatus,
      // messageBroker: messageBrokerStatus,
    });
  } catch (error:any) {
    res.status(500).json({ error: 'Health check failed', details: error.message });
  }
});

const prisma = new PrismaClient();

async function checkDatabaseConnection(): Promise<string> {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    return 'OK';
  } catch (error) {
    console.log(error);
    return 'Failed';
  }
}

const memcacheClient = new Memcached('localhost:11211');
memcacheClient.on('issue', function(error) {
  console.error('Memcached Client Error:', error);
});

async function checkCacheConnection(): Promise<string> {
  return new Promise((resolve, reject) => {
    memcacheClient.version(function(err, version) {
      memcacheClient.version(function(err, version) {
        if (err) {
          resolve('Failed');
        } else {
          resolve('OK');
        }
      });
    });
  });
}

// async function checkMessageBrokerConnection(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     amqp.connect('amqp://localhost', function(error0, connection) {
//       if (error0) {
//         resolve('Failed');
//       } else {
//         connection.close();
//         resolve('OK');
//       }
//     });
//   });
// }

app.use("/api", api);

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
})