# Info
***
- Traducir la informacion de la documentaciones y la informacion de el readme del main 
***

# BLOCKCHAIN TESIS GAME
***
Este sistema fue hecho para optar por el título de ingeniería en computación para la Universidad José Antonio Páez, en el mismo se muestra implementaciones de contratos programados en solidity y desplegados por python en una Cadena de Bloques Local. Estos datos son rescatados gracias al uso de Moralis en Nextjs.
***
# CONSIDERACIONES DEL FRONT END

## - Instalación

Dentro de la carpeta "TheUjapGame", iniciar la terminal e instalar las dependencias con tu administrador de paquetes de preferencia.

```bash
npm install
# o
yarn install
```

## - Despliegue

Utiliza tu administrador de paquetes para iniciar un entorno de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver en el resultado en tu navegador.

***
# CONSIDERACIONES DEL BACK END
1. [Env config](#env-config)
2. [Brownie](#brownie)

<a name="env-config"></a>
## - Env config
Algunas variables de entorno tienen que ser configuradas antes del compilado del sistema.

### Archivo en la carpeta Backend

Cartera de Usuario de metamask.

`export PRIVATE_KEY= ADDRESS_METAMASK`

Servidor de conexión.

`export WEB3_INFURA_PROJECT_ID= INFURA_PROJECT_ID_KEY`

### Archivo principal de React

Servidor de Moralis.

`NEXT_PUBLIC_SERVER_URL = URL_MORALIS_KEY`

ID del proyecto de Moralis

`NEXT_PUBLIC_APP_ID = PROJECT_ID`

Dirección de quemado, o dirección de cartera DEFAULT

`CONTRACT_ADDRESS = "0x"`

<a name="brownie"></a>
## - Brownie
Es necesario conectar el sistema de brownie a el sistema con la interfaz de ganache. Esto se puede realizar con una instrucción bastante sencilla:

`$ brownie networks add Ethereum ganache-local host=http://0.0.0.0:8545 chainid=1337`

Luego de esto, es posible ejecutar:

`$ brownie run scripts/main.py`

Para usar el menu en consola desarrollado por nosotros para facilitar el despliegue de los contratos.

Hecho todo esto, el programa puede ser ejecutado sin ningun problema.
***
# Desarrolladores

## Temis Barreto - Simetb 
### Desarrollo de Backend, Contratos Inteligentes y Configuración de BloackChain Local

[![](https://avatars.githubusercontent.com/u/71613243?size=50)](https://github.com/simetb)

## Daniel Hernández - ManguitoDeveloper (Perfil Antiguo: DanteHPVzla)
### Desarrollo de Frontend y Diseño de la aplicación

[![](https://avatars.githubusercontent.com/u/98782422?size=50)](https://github.com/ManguitoDeveloper)
[![](https://avatars.githubusercontent.com/u/60875213?size=50)](https://github.com/DanteHPVzla)
