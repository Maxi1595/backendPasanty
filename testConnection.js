const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const pasantes = await prisma.pasante.findMany();
    console.log("✅ Conexión exitosa a la base de datos.");
    console.log("Pasantes existentes:", pasantes);
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
