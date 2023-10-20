const { PrismaClient } = require("@prisma/client");

const users = [
  { firstname: "John", lastname: "Doe", email: "john.doe@example.com" },
  { firstname: "Jane", lastname: "Smith", email: "jane.smith@example.com" },
  {
    firstname: "Robert",
    lastname: "Johnson",
    email: "robert.johnson@example.com",
  },
  { firstname: "Emily", lastname: "Davis", email: "emily.davis@example.com" },
  {
    firstname: "Michael",
    lastname: "Wilson",
    email: "michael.wilson@example.com",
  },
  { firstname: "Amanda", lastname: "Brown", email: "amanda.brown@example.com" },
  {
    firstname: "William",
    lastname: "Jones",
    email: "william.jones@example.com",
  },
  {
    firstname: "Olivia",
    lastname: "Martinez",
    email: "olivia.martinez@example.com",
  },
  { firstname: "James", lastname: "Garcia", email: "james.garcia@example.com" },
  {
    firstname: "Sophia",
    lastname: "Miller",
    email: "sophia.miller@example.com",
  },
];

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
