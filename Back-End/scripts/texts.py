from scripts.helpful_scripts import *


# The principal console message
PRINCIPAL_MESSAGE = {
    'options':["Opciones de Admin","Opciones de Usuario","Cambiar Cuenta","Cerrar Menu"],
    'message':""" 
`Ujap students` juego implementado con contratos de nft en solidity
@dev Una completa implementacion de los contratos ERC721, VRFConsumerBase, Ownable, Strings 

Proyecto realizado para la presentación de una tesis universitaria, basado en los estudios
y bases de datos de la cadena de bloques para crear un juego, hecho para ejecutarse en Kovan Test
Blockchain, Blockchain local y Blockchain principal de Ethereum.

Autor de Backend: https://github.com/simetb
----------------------------------------------------------------------"""
}

# Owner option console message
OWNER_MESSAGE = {
    'options':["Desplegar contrato","Opciones de Liquidez","Opciones de Token","Optiones de Contrato","Volver"],
    'message':"""
Solo el dueño del CONTRATO puede interactuar con estas funciones
----------------------------------------------------------------------"""
}

# User Options console message
USER_OPTIONS = {
    'options':["Informacion de la cuenta","Opciones de Mercado","Opciones de Nft","The Ujap Game","Opciones de Token","Opciones de Transferencia","Volver"],
    'message':"""
Necesitas tener una cuenta selecionada para interactuar con estas funciones
----------------------------------------------------------------------"""
}