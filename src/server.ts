import express, {json, urlencoded, Request, Response} from "express";
import cors from "cors";
import 'dotenv/config';
import morgan from "morgan";
import { PrismaClient } from '@prisma/client';
import Memcached from 'memcached';
import api from "./routes/api";
import { HashInfo } from "./utils/hasher";

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


// database seeding:
async function seedDatabase() {
  // Create some users
  const hashedPasswords = await Promise.all([
    HashInfo("password123"),
    HashInfo("password123"),
    HashInfo("password123"),
  ]);

  await prisma.user.createMany({
    data: [
      {
        email: "john.doe@example.com",
        password: hashedPasswords[0],
        name: "John Doe",
      },
      {
        email: "jane.doe@example.com",
        password: hashedPasswords[1],
        name: "Jane Doe",
      },
      {
        email: "bob.smith@example.com",
        password: hashedPasswords[2],
        name: "Bob Smith",
      },
    ],
  });

  // Create some events
  await prisma.event.createMany({
    data: [
      {
        name: "Concert",
        date: new Date("2024-03-01T20:00:00.000Z"),
        totalSeats: 100,
      },
      {
        name: "Theater Play",
        date: new Date("2024-03-15T20:00:00.000Z"),
        totalSeats: 50,
      },
      {
        name: "Comedy Show",
        date: new Date("2024-03-22T20:00:00.000Z"),
        totalSeats: 200,
      },
    ],
  });

  // Create some seats for each event
  const events = await prisma.event.findMany();
  for (const event of events) {
    await prisma.seat.createMany({
      data: Array(event.totalSeats)
        .fill(0)
        .map((_, index) => ({
          eventId: event.id,
          label: `Seat ${index + 1}`,
        })),
    });
  }

  // Create some bookings
  const users = await prisma.user.findMany();
  const seats = await prisma.seat.findMany();
  await prisma.booking.createMany({
    data: [
      {
        userId: users[0].id,
        eventId: events[0].id,
        seatId: seats[0].id,
      },
      {
        userId: users[1].id,
        eventId: events[1].id,
        seatId: seats[5].id,
      },
      {
        userId: users[2].id,
        eventId: events[2].id,
        seatId: seats[10].id,
      },
    ],
  });
}

// seedDatabase()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   }); // Uncomment this line to seed the database

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
})