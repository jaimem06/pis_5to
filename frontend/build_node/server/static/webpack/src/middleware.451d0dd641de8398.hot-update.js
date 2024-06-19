"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/middleware.js":
/*!***************************!*\
  !*** ./src/middleware.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nasync function validarTokenBackend(token) {\n    const url = \"http://localhost:5000/validar_token\";\n    const response = await fetch(url, {\n        method: \"GET\",\n        headers: {\n            \"X-Access-Tokens\": token,\n            \"Content-Type\": \"application/json\"\n        }\n    });\n    const data = await response.json();\n    return data;\n}\nasync function middleware(request) {\n    const cookies = request.cookies;\n    const token = cookies.get(\"token\");\n    if (!token) {\n        console.log(\"Middleware: No existe token redirigiendo a /inicio-sesion\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/inicio-sesion\", request.url));\n    }\n    // Validar el token contra el backend\n    const validacion = await validarTokenBackend(token);\n    if (validacion.code !== 200) {\n        console.log(\"Middleware: Token inv\\xe1lido, redirigiendo a /inicio-sesion\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/inicio-sesion\", request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        \"/admin-usuario\",\n        \"/admin-sensor\",\n        \"/ubicacion-sensor\",\n        \"/configuracion-perfil\",\n        \"/\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBRTNDLGVBQWVDLG9CQUFvQkMsS0FBSztJQUN0QyxNQUFNQyxNQUFNO0lBQ1osTUFBTUMsV0FBVyxNQUFNQyxNQUFNRixLQUFLO1FBQ2hDRyxRQUFRO1FBQ1JDLFNBQVM7WUFDUCxtQkFBbUJMO1lBQ25CLGdCQUFnQjtRQUNsQjtJQUNGO0lBQ0EsTUFBTU0sT0FBTyxNQUFNSixTQUFTSyxJQUFJO0lBQ2hDLE9BQU9EO0FBQ1Q7QUFFTyxlQUFlRSxXQUFXQyxPQUFPO0lBQ3RDLE1BQU1DLFVBQVVELFFBQVFDLE9BQU87SUFDL0IsTUFBTVYsUUFBUVUsUUFBUUMsR0FBRyxDQUFDO0lBRTFCLElBQUksQ0FBQ1gsT0FBTztRQUNWWSxRQUFRQyxHQUFHLENBQUM7UUFDWixPQUFPZixxREFBWUEsQ0FBQ2dCLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLGtCQUFrQk4sUUFBUVIsR0FBRztJQUNwRTtJQUVBLHFDQUFxQztJQUNyQyxNQUFNZSxhQUFhLE1BQU1qQixvQkFBb0JDO0lBQzdDLElBQUlnQixXQUFXQyxJQUFJLEtBQUssS0FBSztRQUMzQkwsUUFBUUMsR0FBRyxDQUFDO1FBQ1osT0FBT2YscURBQVlBLENBQUNnQixRQUFRLENBQUMsSUFBSUMsSUFBSSxrQkFBa0JOLFFBQVFSLEdBQUc7SUFDcEU7SUFFQSxPQUFPSCxxREFBWUEsQ0FBQ29CLElBQUk7QUFDMUI7QUFFTyxNQUFNQyxTQUFTO0lBQ3BCQyxTQUFTO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtLQUNEO0FBQ0gsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbWlkZGxld2FyZS5qcz9hNDlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuYXN5bmMgZnVuY3Rpb24gdmFsaWRhclRva2VuQmFja2VuZCh0b2tlbikge1xuICBjb25zdCB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwL3ZhbGlkYXJfdG9rZW4nO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtQWNjZXNzLVRva2Vucyc6IHRva2VuLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICB9KTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcXVlc3QpIHtcbiAgY29uc3QgY29va2llcyA9IHJlcXVlc3QuY29va2llcztcbiAgY29uc3QgdG9rZW4gPSBjb29raWVzLmdldCgndG9rZW4nKTtcblxuICBpZiAoIXRva2VuKSB7XG4gICAgY29uc29sZS5sb2coJ01pZGRsZXdhcmU6IE5vIGV4aXN0ZSB0b2tlbiByZWRpcmlnaWVuZG8gYSAvaW5pY2lvLXNlc2lvbicpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2luaWNpby1zZXNpb24nLCByZXF1ZXN0LnVybCkpO1xuICB9XG5cbiAgLy8gVmFsaWRhciBlbCB0b2tlbiBjb250cmEgZWwgYmFja2VuZFxuICBjb25zdCB2YWxpZGFjaW9uID0gYXdhaXQgdmFsaWRhclRva2VuQmFja2VuZCh0b2tlbik7XG4gIGlmICh2YWxpZGFjaW9uLmNvZGUgIT09IDIwMCkge1xuICAgIGNvbnNvbGUubG9nKCdNaWRkbGV3YXJlOiBUb2tlbiBpbnbDoWxpZG8sIHJlZGlyaWdpZW5kbyBhIC9pbmljaW8tc2VzaW9uJyk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvaW5pY2lvLXNlc2lvbicsIHJlcXVlc3QudXJsKSk7XG4gIH1cblxuICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgbWF0Y2hlcjogW1xuICAgICcvYWRtaW4tdXN1YXJpbycsXG4gICAgJy9hZG1pbi1zZW5zb3InLFxuICAgICcvdWJpY2FjaW9uLXNlbnNvcicsXG4gICAgJy9jb25maWd1cmFjaW9uLXBlcmZpbCcsXG4gICAgJy8nXG4gIF0sXG59OyJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJ2YWxpZGFyVG9rZW5CYWNrZW5kIiwidG9rZW4iLCJ1cmwiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImRhdGEiLCJqc29uIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJjb29raWVzIiwiZ2V0IiwiY29uc29sZSIsImxvZyIsInJlZGlyZWN0IiwiVVJMIiwidmFsaWRhY2lvbiIsImNvZGUiLCJuZXh0IiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.js\n");

/***/ })

});