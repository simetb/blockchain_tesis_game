# TESIS BLOCKCHAIN UJAP
***
Este sistema fue hecho para optar por el titulo de ingenieria en computacion para la Universidad Jose Antonio Paez, en el mismo se muestra implementaciones de contratos programados en solidity y desplegados por python en una Cadena de Bloques Local. Estos datos son rescatados gracias al uso de Moralis en React.
***
# CONSIDERACIONES DEL FRONT - END
***
***
# CONSIDERACIONES DEL BACK - END
***
1. [Env config](#env-config)
2. [Brownie](#brownie)

<a name="env-config"></a>
## - Env config
Algunas variables de entorno tienen que ser configuradas antes del compilado del sistema.

### Archivo en la carpeta Backend

Cartera de Usuario de metamask.

`export PRIVATE_KEY= ADDRESS_METAMASK`

Servidor de conexion.

`export WEB3_INFURA_PROJECT_ID= INFURA_PROJECT_ID_KEY`

### Archivo principal de react

Servidor de Moralis.

`NEXT_PUBLIC_SERVER_URL = URL_MORALIS_KEY`

ID del projecto de Moralis

`NEXT_PUBLIC_APP_ID = PROJECT_ID`

Direccion de quemado, o direccion de cartera DEFAULT

`CONTRACT_ADDRESS = "0x"`

<a name="brownie"></a>
## - Brownie
Es necesario conectar el sistema de brownie a el sistema con interface de ganache. esto se puede realizar con una instruccion bastante sencilla.

`$ brownie networks add Ethereum ganache-local host=http://0.0.0.0:8545 chainid=1337`

luego de esto es posible ejecutar

`$ brownie run scripts/main.py`

Para usar el menu en consola desarrollado por nosotros para facilitar el despliegue de los contratos.

hecho todo esto el programa puede ser ejecutado sin ningun problema.
***
# Desarrolladores

## Temis Barreto - Simetb 
### Desarrollo de Backend, Contratos Inteligentes y Configuracion de BloackChain Local
<a href="https://github.com/simetb">Perfil GitHub</a>

## Daniel Hernandez - ???
### ???
<a href="???">Perfil GitHub</a>

