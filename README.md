
## Inicar en el entorno de desarrollo

1. Activar el entorno virtual con el comando:
    - Linux: `source backend/virtual/bin/activate`
    - PowerShell: `. .\backend\virtual\bin\Activate.ps1`

## Flujo de trabajo de Git

1. Se creo una rama `develop` para cada nueva característica o codigo que se agregue.
2. El progreso de cada uno subir a `develop`.
3. Cuando se tenga ya halgo funcional en, `develop` se fusionará en la rama `pruebas` para pruebas de integración.
4. Si todo en `pruebas` funciona, se fusionará en `main`.

NOTA: No hacer commit directamente en `main`.

## Configuración del proyecto

Para evitar conflictos entre los entornos virtuales, cada uno cambiar la dirección de su proyecto en el archivo `pyvenv.cfg`
Igual solo hacer una vez por que ya esta el .gitignore
