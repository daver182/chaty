#Chaty

Chaty es una aplicación de escritorio, construida con Angularjs, Firebase y Electron. Permite intercambiar mensajes con los demás usuarios del sistema, estén o no conectados.

Se utilizaron una serie de bibliotecas para mejorar la experiencia de usuario, se utilizó Flat UI para mejorar la apariencia de la aplicación.

##Listado de bibliotecas utilizadas

* Angularfire
* Bootstrap
* Chance
* Angular Block UI
* Angular Moment
* Moment
* Sweet Alert

Además se utilizó Yeoman y el generador de Angularfire, **generator-angularfire**,  para crear la aplicación y permitir construirla de manera mas eficiente. Este generador contiene servicios y directivas que permiten realizar ciertas tareas de manera más rápida.

Por otro lado se incluyeron otros complementos para construir la aplicación de escritorio, lo 	que permitió hacerla funcionar en Mac OSX, Linux y Windows. El complemento es **grunt-electron**, que a su vez utiliza **electron-packager**.


##Funcionamiento de la aplicación

La aplicación tiene tres rutas importantes, /chat, /login y /account.

###La ruta /login

Esta ruta permite iniciar sesión o crear una cuenta. En el mismo formulario permite hacer las dos acciones.

Para iniciar sesión se utiliza un servicio provisto por el generador, Auth, este servicio crea una instancia de $firebaseAuth, con la referencia a la URL de Chaty. Este objeto contiene el metodo *$authWithPassword*, este método recibe el correo y la contraseña e inicia sesión, si es correcta nos lleva a la ruta /account.

Para registrarse la aplicación utiliza el mismo servicio Auth, este tiene un método *$createUser*, este metodo acepta el email y la contraseña. Cuando se ejecuta correctamente crea un perfil en la base de datos, con un nombre al azar.

###La ruta /account

La ruta *account*, permite ver los datos del usuario ingresado, como el ID y el Email, y a la vez permite cambiar el nombre de usuario por defecto. Desde aquí también se puede cerrar sesión.

###La ruta /chat

Esta es la ruta mas importante de la aplicación, realiza varias acciones para poder utilizar el chat.

En primer lugar lista todos los usuarios del sistema, muestrasu nombre de usuario y el correo, para eso se utiliza el servicio *$firebaseArray*, el cual carga el arreglo con todos los usuarios.

Después se declara el método para cargar los mensajes del chat, este metodo recibe el usuario con el que se quiere chatear. Se establece una variable con el usuario actual con el fin de destacarlo en la interfaz.

Cuando un usuario selecciona al usuario remoto se ejecuta el método *load* el cual recibe el usuario remoto. Este metodo a su vez ejecuta la función *loadChat* con el ID del usuario remoto, y el usuario local. Esta función llama a *$firebaseArray* con ambos ID, en el orden mencionado, si encuentra mensajes ejecuta la función *messagesLoaded* pasándole los mensajes encontrados, esta función muestra los mensajes en la UI. Si no encuentra mensajes quiere decir que la lista de mensajes no existe, entonces intenta cargar los mensajes intercambiando el orden de los ID de los usuarios, ejecutando *loadChat* nuevamente. Lo anterior se hace para comprobar primero que el usuario remoto no haya iniciado ya una conversación con el usuario local, si no fuera así, el usuario local puede comenzar el chat, creando el arreglo.

Finalmente esta el metodo *addMessage*, este metodo crea un nuevo mensaje en el arreglo antes cargado. Primero comprueba que exista el arreglo y que exista un usuario ya cargado. El mensaje contiene el ID del autor, el texto y la fecha en milisegundos desde el 1 de enero de 1970. Este valor luego se utiliza con Moment, para mostrar hace cuanto tiempo se creó el mensaje.

Todos los metodos ejecutados sobre Firebase tienen asociado un *catch*, que permite mostrar los errores de conexión o de escritura/lectura sobre la base de datos, faltaría un mayor desarrollo para mostrar mayor detalle sobre el error.

###Directivas y servicios

La aplicación cuenta con directivas y servicios que fueron creados por el generador, pero permiten obtener una mejor funcionalidad de la aplicación

#### Directiva ngHideAuth, ngShowAuth

Estas directivas esconden o muestran un elemento, si el usuario tiene o no una sesión en la aplicación. Utilizan el mismo servicio *Auth*, con el metodo *$getAuth()*, también escuchan por el evento cuando se ha iniciado sesión, *$onAuth*.

#### Servicio Auth

El servicio Auth crea un *factory*, llamando al servicio *$firebaseAuth*, pasandole como argumento la referencia a Firebase.

#### Constantes en config.js

Aqui se establecen algunas constantes que utiliza Firebase, como la URL, los providers para el login y la ruta para redirigir del login.  

#### Servicio Firebase.ref

Este servicio crea un *factory* que devuelve una referencia a Firebase, utilizando la URL de la aplicación.

#### Directiva Reverse

Este directiva invierte el orden de los mensajes, venía con el generador pero después se dejo de utilizar en la aplicación.


##Pasos para construir la aplicación

Primero se instalan las dependencias de Yeoman:

	npm install
	
Después se instalan las dependecias de la aplicación:

	bower install
	
A continuación se puede hacer correr la aplicación web con:

	grunt serve
	
Ahora si se quiere construir la aplicación de escritorio se ejecuta:

	grunt build
	
Existen otras tareas de Grunt, que permiten construir la aplicación de escritorio para cada plataforma individual, se deben ejecutar **después** de hacer un **build** para que tome los archivos ya compilados:

	grunt build:osx
	grunt build:win
	grunt build:linux

La compilación de la aplicación queda en *build/app*, dentro de la carpeta build hay tres archivos, un icono, el packege.json y el script principal para la aplicación de escritorio. Estos no deben moverse para que se genere correctamente. Los ejecutables quedan en la carpeta *desktop*, uno para cada plataforma.
	
La aplicación corriendo en los tres sistemas operativos:

![Ubuntu](http://www.danielvergara.info/images/others/Ubuntu.png)

![Mac](http://www.danielvergara.info/images/others/Mac.png)

![Windows](http://www.danielvergara.info/images/others/Windows.png)

*Nota: El icono de la aplicación solo se aplica para OSX, porque para Linux no funciona y para Windows es necesario instalar Wine y a su vez sus complementos*
