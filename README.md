Este proyecto utiliza la [REST Countries API v3.1](https://restcountries.com/v3.1/all) para obtener información detallada sobre los países del mundo. Los datos que se extraen y utilizan en el juego incluyen:

* **Nombre Común:** Para mostrar el nombre del país.
* **Capital:** Para generar preguntas sobre las capitales.
* **Bandera (PNG):** Para mostrar la imagen de la bandera en las preguntas.
* **Fronteras (Códigos ISO 3166-1 alpha-3):** Para determinar el número de países limítrofes.

La API se consulta una sola vez al inicio para almacenar en caché la información de los países, optimizando así el rendimiento y reduciendo las peticiones innecesarias.

## 🚀 ¿Listo para Jugar?
¡Empieza a desafiar tu conocimiento geográfico ahora mismo!

➡️ **Juega en vivo:** [https://triviapaises.onrender.com/](https://triviapaises.onrender.com/)

Si prefieres ejecutar la aplicación localmente, sigue estos pasos:



Sigue estos sencillos pasos para probar Geo Trivia Challenge:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/fernadaArrieta/IntegradorWebII_Arrieta.git)
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd IntegradorWebII_Arrieta
    ```
3.  **Instala las dependencias del backend:**
    ```bash
    cd backend  # Si tu backend está en una subcarpeta llamada "backend"
    npm install
    cd ..      # Vuelve al directorio raíz
    ```
4.  **Inicia el servidor backend:**
    ```bash
    cd backend
    npm start
    cd ..
    ```
    (Asegúrate de que tu backend esté corriendo en `http://localhost:3000` por defecto)
5.  **Abre el archivo `public/index.html` en tu navegador.**

¡Y empieza a desafiar tu conocimiento geográfico!

## 🏆 ¡Únete al Ranking!

Una vez que juegues y obtengas una puntuación, tu nombre y resultado se guardarán en un ranking local (en este ejemplo, probablemente en memoria o en un archivo local del servidor). ¡Intenta obtener la puntuación más alta y el tiempo más rápido para llegar a la cima!


¡Esperamos que disfrutes de Geo Trivia Challenge! ¡Demuestra cuánto sabes del mundo! 🌍🚩🗺️
