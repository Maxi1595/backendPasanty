Titulo: 

Pasanty

descripcion: 

Marketplace que conecta empresas con estudiantes para prácticas profesionales.

tecnologias utilizadas:

* Node.js
* Express
* PostgreSQL
* Prisma
* JWT

Instalación: 

* Traiga todo el proyecto a su computadora
* Cree la base de datos llamada Pasanty en postgreSQL
* Dirigase mediante comandos en cmd a la carpeta donde se aloja el proyecto,
* Haga los siguientes comandos para instalar las dependencias:
npm install
npx prisma generate
npx prisma migrate dev
* Para levantar el backend solo debe utilizar el siguiente comando
node server.js

Variables de entorno:

Debera tener la variable de entorno (.env) y escribir lo siguiente:
DATABASE_URL="postgresql://postgres:[CONTRASEÑA]@localhost:[PUERTO]/[NOMBRE DE LA DB]"
SECRET_KEY="[CLAVE SECRETA]"

Estado:

En desarrollo

Autor:

Maxi
