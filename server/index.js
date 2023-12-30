import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();

async function main() {
  const uri = 'mongodb+srv://electrictiesto:4N8zGHH8CabTO0B7@clusterweb.kvr7b9g.mongodb.net/';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conexión a MongoDB Atlas establecida');
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  try {
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (err) {
    console.error(err);
  }
}

// Iniciar la conexión a MongoDB
main();

// Ruta principal
app.get('/', (_, res) => {
  res.send('Hola desde el servidor');
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`El servidor en el puerto ${PORT} está funcionando correctamente`);
});
