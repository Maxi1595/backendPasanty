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

Arquitectura:

La arquitectura esta en contante desarrollo para la continua mejora del proyecto, pero principalmente utilizamos el patron MVC para el proyecto, actualmente se esta haciendo mas archivos con centralizacion para mejorar el desarrollo del mismo

* controllers
* middleware
* prisma
* routes
* service

Modelo de Roles / Usuarios:

Aqui utilizamos un sistema de roles basado en numeros para el mejor manejo e implementacion de validadores, todos lo usuarios heredan el rol de la tabla/entidad base "usuario". el middleware es el encargado de revisar (solo en las rutas donde es llamado) el tipo de rol que tienes por el token y este te da o no permiso para acceder a ese ENDPOINT.
Los diferentes usuarios son los siguiente (se agregaran mas):
* Pasante
* Empresa

Funcionalidades Actuales:

El middleware para revisar los tokens y los roles funcionan, ademas de tener el auth funcionando.
se estra actualmente trabajando en un refreshToken automatico para la pagina, que sigue en produccion.
Los CRUD de cada entidad funcionan correctamente, aunque aun se deben mejorar para agregar centralizacion



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

En desarrollo, MVP
Las proximas mejoras sera un refreshtoken automatico, centralizaciones, mejoras de arquitectura y cambios en los controladores.

Autor:

Maxi
https://github.com/Maxi1595
