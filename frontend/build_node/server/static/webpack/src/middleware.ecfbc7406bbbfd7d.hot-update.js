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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nasync function validarTokenBackend(token) {\n    const url = \"http://localhost:5000/validar_token\";\n    try {\n        const response = await fetch(url, {\n            method: \"GET\",\n            headers: {\n                \"X-Access-Tokens\": token,\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        const data = await response.json();\n        console.log(\"Respuesta del backend:\", data);\n        return data;\n    } catch (error) {\n        console.error(\"Error al validar el token en el backend:\", error);\n        return {\n            code: 500,\n            msg: \"Internal Server Error\"\n        };\n    }\n}\nasync function middleware(request) {\n    const cookies = request.cookies;\n    const token = cookies.get(\"token\");\n    console.log(\"Token en middleware:\", token);\n    if (!token) {\n        console.log(\"Middleware: No existe token redirigiendo a /inicio-sesion\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/inicio-sesion\", request.url));\n    }\n    // Validar el token contra el backend\n    const validacion = await validarTokenBackend(token);\n    if (validacion.code !== 200) {\n        console.log(\"Middleware: Token inv\\xe1lido, redirigiendo a /inicio-sesion\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/inicio-sesion\", request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        \"/admin-usuario\",\n        \"/admin-sensor\",\n        \"/ubicacion-sensor\",\n        \"/configuracion-perfil\",\n        \"/\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBRTNDLGVBQWVDLG9CQUFvQkMsS0FBSztJQUN0QyxNQUFNQyxNQUFNO0lBQ1osSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTUYsS0FBSztZQUNoQ0csUUFBUTtZQUNSQyxTQUFTO2dCQUNQLG1CQUFtQkw7Z0JBQ25CLGdCQUFnQjtZQUNsQjtRQUNGO1FBQ0EsTUFBTU0sT0FBTyxNQUFNSixTQUFTSyxJQUFJO1FBQ2hDQyxRQUFRQyxHQUFHLENBQUMsMEJBQTBCSDtRQUN0QyxPQUFPQTtJQUNULEVBQUUsT0FBT0ksT0FBTztRQUNkRixRQUFRRSxLQUFLLENBQUMsNENBQTRDQTtRQUMxRCxPQUFPO1lBQUVDLE1BQU07WUFBS0MsS0FBSztRQUF3QjtJQUNuRDtBQUNGO0FBRU8sZUFBZUMsV0FBV0MsT0FBTztJQUN0QyxNQUFNQyxVQUFVRCxRQUFRQyxPQUFPO0lBQy9CLE1BQU1mLFFBQVFlLFFBQVFDLEdBQUcsQ0FBQztJQUMxQlIsUUFBUUMsR0FBRyxDQUFDLHdCQUF3QlQ7SUFFcEMsSUFBSSxDQUFDQSxPQUFPO1FBQ1ZRLFFBQVFDLEdBQUcsQ0FBQztRQUNaLE9BQU9YLHFEQUFZQSxDQUFDbUIsUUFBUSxDQUFDLElBQUlDLElBQUksa0JBQWtCSixRQUFRYixHQUFHO0lBQ3BFO0lBRUEscUNBQXFDO0lBQ3JDLE1BQU1rQixhQUFhLE1BQU1wQixvQkFBb0JDO0lBQzdDLElBQUltQixXQUFXUixJQUFJLEtBQUssS0FBSztRQUMzQkgsUUFBUUMsR0FBRyxDQUFDO1FBQ1osT0FBT1gscURBQVlBLENBQUNtQixRQUFRLENBQUMsSUFBSUMsSUFBSSxrQkFBa0JKLFFBQVFiLEdBQUc7SUFDcEU7SUFFQSxPQUFPSCxxREFBWUEsQ0FBQ3NCLElBQUk7QUFDMUI7QUFFTyxNQUFNQyxTQUFTO0lBQ3BCQyxTQUFTO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtLQUNEO0FBQ0gsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbWlkZGxld2FyZS5qcz9hNDlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuYXN5bmMgZnVuY3Rpb24gdmFsaWRhclRva2VuQmFja2VuZCh0b2tlbikge1xuICBjb25zdCB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDo1MDAwL3ZhbGlkYXJfdG9rZW4nO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnWC1BY2Nlc3MtVG9rZW5zJzogdG9rZW4sXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgYmFja2VuZDonLCBkYXRhKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCB2YWxpZGFyIGVsIHRva2VuIGVuIGVsIGJhY2tlbmQ6JywgZXJyb3IpO1xuICAgIHJldHVybiB7IGNvZGU6IDUwMCwgbXNnOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcXVlc3QpIHtcbiAgY29uc3QgY29va2llcyA9IHJlcXVlc3QuY29va2llcztcbiAgY29uc3QgdG9rZW4gPSBjb29raWVzLmdldCgndG9rZW4nKTtcbiAgY29uc29sZS5sb2coJ1Rva2VuIGVuIG1pZGRsZXdhcmU6JywgdG9rZW4pO1xuXG4gIGlmICghdG9rZW4pIHtcbiAgICBjb25zb2xlLmxvZygnTWlkZGxld2FyZTogTm8gZXhpc3RlIHRva2VuIHJlZGlyaWdpZW5kbyBhIC9pbmljaW8tc2VzaW9uJyk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvaW5pY2lvLXNlc2lvbicsIHJlcXVlc3QudXJsKSk7XG4gIH1cblxuICAvLyBWYWxpZGFyIGVsIHRva2VuIGNvbnRyYSBlbCBiYWNrZW5kXG4gIGNvbnN0IHZhbGlkYWNpb24gPSBhd2FpdCB2YWxpZGFyVG9rZW5CYWNrZW5kKHRva2VuKTtcbiAgaWYgKHZhbGlkYWNpb24uY29kZSAhPT0gMjAwKSB7XG4gICAgY29uc29sZS5sb2coJ01pZGRsZXdhcmU6IFRva2VuIGludsOhbGlkbywgcmVkaXJpZ2llbmRvIGEgL2luaWNpby1zZXNpb24nKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoJy9pbmljaW8tc2VzaW9uJywgcmVxdWVzdC51cmwpKTtcbiAgfVxuXG4gIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpO1xufVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBtYXRjaGVyOiBbXG4gICAgJy9hZG1pbi11c3VhcmlvJyxcbiAgICAnL2FkbWluLXNlbnNvcicsXG4gICAgJy91YmljYWNpb24tc2Vuc29yJyxcbiAgICAnL2NvbmZpZ3VyYWNpb24tcGVyZmlsJyxcbiAgICAnLydcbiAgXSxcbn07XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwidmFsaWRhclRva2VuQmFja2VuZCIsInRva2VuIiwidXJsIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJkYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImNvZGUiLCJtc2ciLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsImNvb2tpZXMiLCJnZXQiLCJyZWRpcmVjdCIsIlVSTCIsInZhbGlkYWNpb24iLCJuZXh0IiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.js\n");

/***/ })

});