"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/admin-usuario/[external]/page",{

/***/ "(app-pages-browser)/./src/app/admin-usuario/[external]/page.tsx":
/*!***************************************************!*\
  !*** ./src/app/admin-usuario/[external]/page.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert */ \"(app-pages-browser)/./node_modules/sweetalert/dist/sweetalert.min.js\");\n/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! yup */ \"(app-pages-browser)/./node_modules/yup/index.esm.js\");\n/* harmony import */ var _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @hookform/resolvers/yup */ \"(app-pages-browser)/./node_modules/@hookform/resolvers/yup/dist/yup.mjs\");\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-hook-form */ \"(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs\");\n/* harmony import */ var _hooks_servicio_persona__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/hooks/servicio_persona */ \"(app-pages-browser)/./src/hooks/servicio_persona.js\");\n/* harmony import */ var _components_Layouts_DefaultLaout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/Layouts/DefaultLaout */ \"(app-pages-browser)/./src/components/Layouts/DefaultLaout.tsx\");\n/* harmony import */ var _components_Breadcrumbs_Breadcrumb__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/Breadcrumbs/Breadcrumb */ \"(app-pages-browser)/./src/components/Breadcrumbs/Breadcrumb.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst FormularioPersona = ()=>{\n    var _errors_nombre, _errors_apellido;\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const external = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)().external;\n    let [persona, setPersona] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    console.log(external);\n    const validationSchema = yup__WEBPACK_IMPORTED_MODULE_4__.object().shape({\n        nombre: yup__WEBPACK_IMPORTED_MODULE_4__.string().trim().required(\"El nombre es requerido\"),\n        apellido: yup__WEBPACK_IMPORTED_MODULE_4__.string().trim().required(\"El apellido es requerido\"),\n        correo: yup__WEBPACK_IMPORTED_MODULE_4__.string().trim().email().required(\"El correo es requerido\")\n    });\n    const formOptions = {\n        resolver: (0,_hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_5__.yupResolver)(validationSchema)\n    };\n    const { register, handleSubmit, formState, setValue } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useForm)(formOptions);\n    const errors = formState.errors;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        (0,_hooks_servicio_persona__WEBPACK_IMPORTED_MODULE_6__.obtener_persona)(external).then((res)=>{\n            if (res && res.code === 200) {\n                setPersona(res.datos);\n                setValue(\"nombre\", res.datos.nombre);\n                setValue(\"apellido\", res.datos.apellido);\n                setValue(\"correo\", res.datos.cuenta.correo);\n            } else {\n                console.log(\"Error\");\n            }\n        });\n    }, [\n        external,\n        setValue\n    ]);\n    const enviar_data = (data)=>{\n        try {\n            //data[\"correo\"]=persona.cuenta.correo;\n            console.log(data);\n            (0,_hooks_servicio_persona__WEBPACK_IMPORTED_MODULE_6__.modificar_persona)(data, external).then((info)=>{\n                console.log(info);\n                if (info && info.code === 200) {\n                    console.log(info);\n                    sweetalert__WEBPACK_IMPORTED_MODULE_3___default()({\n                        title: \"Info\",\n                        text: info.data.tag,\n                        icon: \"success\",\n                        timer: 6000,\n                        closeOnEsc: true\n                    });\n                    router.push(\"/admin-usuario\");\n                //router.refresh();\n                } else {\n                    sweetalert__WEBPACK_IMPORTED_MODULE_3___default()({\n                        title: \"Error\",\n                        text: info.datos.error,\n                        icon: \"error\",\n                        timer: 6000,\n                        closeOnEsc: true\n                    });\n                    console.log(info);\n                    console.log(\"NO\");\n                }\n            });\n        } catch (error) {\n            console.error(\"Error al modificar credenciales:\", error);\n        }\n    };\n    const cancelar = ()=>{\n        router.push(\"/admin-usuario\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layouts_DefaultLaout__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mx-auto max-w-7xl\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Breadcrumbs_Breadcrumb__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                    pageName: \"Modificar datos personales\"\n                }, void 0, false, {\n                    fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                    lineNumber: 90,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                lineNumber: 89,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"mx-auto max-w-md rounded-[10px] border border-stroke bg-white p-4 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5\",\n                onSubmit: handleSubmit(enviar_data),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mb-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"mb-2 block text-sm font-bold text-dark dark:text-white\",\n                                htmlFor: \"nombre\",\n                                children: \"Nombre\"\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 97,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                id: \"nombre\",\n                                required: true,\n                                ...register(\"nombre\"),\n                                defaultValue: persona && persona.nombre,\n                                className: \"w-full rounded border border-[#eee] px-3 py-2 dark:border-dark-3\"\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 103,\n                                columnNumber: 11\n                            }, undefined),\n                            errors.nombre && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-danger mt-1\",\n                                children: (_errors_nombre = errors.nombre) === null || _errors_nombre === void 0 ? void 0 : _errors_nombre.message\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 112,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                        lineNumber: 96,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mb-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"mb-2 block text-sm font-bold text-dark dark:text-white\",\n                                htmlFor: \"apellido\",\n                                children: \"Apellido\"\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 116,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                id: \"apellido\",\n                                required: true,\n                                ...register(\"apellido\"),\n                                defaultValue: persona && persona.apellido,\n                                className: \"w-full rounded border border-[#eee] px-3 py-2 dark:border-dark-3\"\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 122,\n                                columnNumber: 11\n                            }, undefined),\n                            errors && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-danger mt-1\",\n                                children: (_errors_apellido = errors.apellido) === null || _errors_apellido === void 0 ? void 0 : _errors_apellido.message\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 131,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                        lineNumber: 115,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-end gap-3\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                className: \"flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90\",\n                                children: \"Guardar\"\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 136,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"button\",\n                                onClick: cancelar,\n                                className: \"flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white\",\n                                children: \"Cancelar\"\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 142,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                        lineNumber: 135,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"text-start font-bold\",\n                        style: {\n                            marginTop: \"2rem\"\n                        },\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                            href: \"/admin-usuario/c/\" + external,\n                            className: \"text-blue-500 hover:text-blue-700\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"u\", {\n                                children: \"Modificar credenciales\"\n                            }, void 0, false, {\n                                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                                lineNumber: 155,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                            lineNumber: 151,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                        lineNumber: 150,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n                lineNumber: 92,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/master/Desktop/PIS/pis_5to/frontend/src/app/admin-usuario/[external]/page.tsx\",\n        lineNumber: 88,\n        columnNumber: 5\n    }, undefined);\n};\n_s(FormularioPersona, \"VHt1fbT346/J7oHZp4Cpp6dwUrc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams,\n        react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useForm\n    ];\n});\n_c = FormularioPersona;\n/* harmony default export */ __webpack_exports__[\"default\"] = (FormularioPersona);\nvar _c;\n$RefreshReg$(_c, \"FormularioPersona\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvYWRtaW4tdXN1YXJpby9bZXh0ZXJuYWxdL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbUQ7QUFDSTtBQUN6QjtBQUNIO0FBQzJCO0FBQ1o7QUFDb0M7QUFDaEI7QUFDRDtBQUNoQztBQVM3QixNQUFNYyxvQkFBb0I7UUE0RnFCQyxnQkFtQkFBOztJQTlHN0MsTUFBTUMsU0FBU2IsMERBQVNBO0lBQ3hCLE1BQU1jLFdBQVdiLDBEQUFTQSxHQUFHYSxRQUFRO0lBQ3JDLElBQUksQ0FBQ0MsU0FBU0MsV0FBVyxHQUFHakIsK0NBQVFBLENBQUM7SUFDckNrQixRQUFRQyxHQUFHLENBQUNKO0lBRVosTUFBTUssbUJBQW1CaEIsdUNBQVUsR0FBR2tCLEtBQUssQ0FBQztRQUMxQ0MsUUFBUW5CLHVDQUFVLEdBQUdxQixJQUFJLEdBQUdDLFFBQVEsQ0FBQztRQUNyQ0MsVUFBVXZCLHVDQUFVLEdBQUdxQixJQUFJLEdBQUdDLFFBQVEsQ0FBQztRQUN2Q0UsUUFBUXhCLHVDQUFVLEdBQUdxQixJQUFJLEdBQUdJLEtBQUssR0FBR0gsUUFBUSxDQUFDO0lBQy9DO0lBRUEsTUFBTUksY0FBYztRQUFFQyxVQUFVMUIsb0VBQVdBLENBQUNlO0lBQWtCO0lBQzlELE1BQU0sRUFBRVksUUFBUSxFQUFFQyxZQUFZLEVBQUVDLFNBQVMsRUFBRUMsUUFBUSxFQUFFLEdBQ25EN0IseURBQU9BLENBQVd3QjtJQUNwQixNQUFNakIsU0FBU3FCLFVBQVVyQixNQUFNO0lBRS9CZCxnREFBU0EsQ0FBQztRQUNSUyx3RUFBZUEsQ0FBQ08sVUFBVXFCLElBQUksQ0FBQyxDQUFDQztZQUM5QixJQUFJQSxPQUFPQSxJQUFJQyxJQUFJLEtBQUssS0FBSztnQkFDM0JyQixXQUFXb0IsSUFBSUUsS0FBSztnQkFDcEJKLFNBQVMsVUFBVUUsSUFBSUUsS0FBSyxDQUFDaEIsTUFBTTtnQkFDbkNZLFNBQVMsWUFBWUUsSUFBSUUs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V0FBVTtzQ0FFViw0RUFBQ2dCOzBDQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTWY7R0E3SU0xRDs7UUFDV1gsc0RBQVNBO1FBQ1BDLHNEQUFTQTtRQVl4QkkscURBQU9BOzs7S0FkTE07QUErSU4sK0RBQWVBLGlCQUFpQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2FkbWluLXVzdWFyaW8vW2V4dGVybmFsXS9wYWdlLnRzeD81Mjc4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciwgdXNlUGFyYW1zIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xuaW1wb3J0IHN3YWwgZnJvbSBcInN3ZWV0YWxlcnRcIjtcbmltcG9ydCAqIGFzIFl1cCBmcm9tIFwieXVwXCI7XG5pbXBvcnQgeyB5dXBSZXNvbHZlciB9IGZyb20gXCJAaG9va2Zvcm0vcmVzb2x2ZXJzL3l1cFwiO1xuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gXCJyZWFjdC1ob29rLWZvcm1cIjtcbmltcG9ydCB7IG1vZGlmaWNhcl9wZXJzb25hLCBvYnRlbmVyX3BlcnNvbmEgfSBmcm9tIFwiQC9ob29rcy9zZXJ2aWNpb19wZXJzb25hXCI7XG5pbXBvcnQgRGVmYXVsdExheW91dCBmcm9tIFwiQC9jb21wb25lbnRzL0xheW91dHMvRGVmYXVsdExhb3V0XCI7XG5pbXBvcnQgQnJlYWRjcnVtYiBmcm9tIFwiQC9jb21wb25lbnRzL0JyZWFkY3J1bWJzL0JyZWFkY3J1bWJcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCBGb3JtdWxhcmlvQ3JlZGVuY2lhbGVzIGZyb20gXCIuLi9jL1tleHRdL3BhZ2VcIjtcblxuaW50ZXJmYWNlIEZvcm1EYXRhIHtcbiAgbm9tYnJlOiBzdHJpbmc7XG4gIGFwZWxsaWRvOiBzdHJpbmc7XG4gIGNvcnJlbzogc3RyaW5nO1xufVxuXG5jb25zdCBGb3JtdWxhcmlvUGVyc29uYSA9ICgpID0+IHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IGV4dGVybmFsID0gdXNlUGFyYW1zKCkuZXh0ZXJuYWw7XG4gIGxldCBbcGVyc29uYSwgc2V0UGVyc29uYV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc29sZS5sb2coZXh0ZXJuYWwpO1xuXG4gIGNvbnN0IHZhbGlkYXRpb25TY2hlbWEgPSBZdXAub2JqZWN0KCkuc2hhcGUoe1xuICAgIG5vbWJyZTogWXVwLnN0cmluZygpLnRyaW0oKS5yZXF1aXJlZChcIkVsIG5vbWJyZSBlcyByZXF1ZXJpZG9cIiksXG4gICAgYXBlbGxpZG86IFl1cC5zdHJpbmcoKS50cmltKCkucmVxdWlyZWQoXCJFbCBhcGVsbGlkbyBlcyByZXF1ZXJpZG9cIiksXG4gICAgY29ycmVvOiBZdXAuc3RyaW5nKCkudHJpbSgpLmVtYWlsKCkucmVxdWlyZWQoXCJFbCBjb3JyZW8gZXMgcmVxdWVyaWRvXCIpLFxuICB9KTtcblxuICBjb25zdCBmb3JtT3B0aW9ucyA9IHsgcmVzb2x2ZXI6IHl1cFJlc29sdmVyKHZhbGlkYXRpb25TY2hlbWEpIH07XG4gIGNvbnN0IHsgcmVnaXN0ZXIsIGhhbmRsZVN1Ym1pdCwgZm9ybVN0YXRlLCBzZXRWYWx1ZSB9ID1cbiAgICB1c2VGb3JtPEZvcm1EYXRhPihmb3JtT3B0aW9ucyk7XG4gIGNvbnN0IGVycm9ycyA9IGZvcm1TdGF0ZS5lcnJvcnM7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvYnRlbmVyX3BlcnNvbmEoZXh0ZXJuYWwpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwKSB7XG4gICAgICAgIHNldFBlcnNvbmEocmVzLmRhdG9zKTtcbiAgICAgICAgc2V0VmFsdWUoXCJub21icmVcIiwgcmVzLmRhdG9zLm5vbWJyZSk7XG4gICAgICAgIHNldFZhbHVlKFwiYXBlbGxpZG9cIiwgcmVzLmRhdG9zLmFwZWxsaWRvKTtcbiAgICAgICAgc2V0VmFsdWUoXCJjb3JyZW9cIiwgcmVzLmRhdG9zLmN1ZW50YS5jb3JyZW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgW2V4dGVybmFsLCBzZXRWYWx1ZV0pO1xuXG4gIGNvbnN0IGVudmlhcl9kYXRhID0gKGRhdGE6IEZvcm1EYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vZGF0YVtcImNvcnJlb1wiXT1wZXJzb25hLmN1ZW50YS5jb3JyZW87XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIG1vZGlmaWNhcl9wZXJzb25hKGRhdGEsIGV4dGVybmFsKS50aGVuKChpbmZvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZm8pO1xuICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGluZm8pO1xuICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgdGl0bGU6IFwiSW5mb1wiLFxuICAgICAgICAgICAgdGV4dDogaW5mby5kYXRhLnRhZyxcbiAgICAgICAgICAgIGljb246IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgdGltZXI6IDYwMDAsXG4gICAgICAgICAgICBjbG9zZU9uRXNjOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJvdXRlci5wdXNoKFwiL2FkbWluLXVzdWFyaW9cIik7XG4gICAgICAgICAgLy9yb3V0ZXIucmVmcmVzaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3JcIixcbiAgICAgICAgICAgIHRleHQ6IGluZm8uZGF0b3MuZXJyb3IsXG4gICAgICAgICAgICBpY29uOiBcImVycm9yXCIsXG4gICAgICAgICAgICB0aW1lcjogNjAwMCxcbiAgICAgICAgICAgIGNsb3NlT25Fc2M6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc29sZS5sb2coaW5mbyk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOT1wiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhbCBtb2RpZmljYXIgY3JlZGVuY2lhbGVzOlwiLCBlcnJvcik7XG4gICAgfVxuICB9O1xuICBjb25zdCBjYW5jZWxhciA9ICgpID0+IHtcbiAgICByb3V0ZXIucHVzaChcIi9hZG1pbi11c3VhcmlvXCIpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPERlZmF1bHRMYXlvdXQ+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm14LWF1dG8gbWF4LXctN3hsXCI+XG4gICAgICAgIDxCcmVhZGNydW1iIHBhZ2VOYW1lPVwiTW9kaWZpY2FyIGRhdG9zIHBlcnNvbmFsZXNcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8Zm9ybVxuICAgICAgICBjbGFzc05hbWU9XCJteC1hdXRvIG1heC13LW1kIHJvdW5kZWQtWzEwcHhdIGJvcmRlciBib3JkZXItc3Ryb2tlIGJnLXdoaXRlIHAtNCBzaGFkb3ctbWQgZGFyazpib3JkZXItZGFyay0zIGRhcms6YmctZ3JheS1kYXJrIGRhcms6c2hhZG93LWNhcmQgc206cC03LjVcIlxuICAgICAgICBvblN1Ym1pdD17aGFuZGxlU3VibWl0KGVudmlhcl9kYXRhKX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+XG4gICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYi0yIGJsb2NrIHRleHQtc20gZm9udC1ib2xkIHRleHQtZGFyayBkYXJrOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgaHRtbEZvcj1cIm5vbWJyZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgTm9tYnJlXG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibm9tYnJlXCJcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICB7Li4ucmVnaXN0ZXIoXCJub21icmVcIil9XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3BlcnNvbmEgJiYgcGVyc29uYS5ub21icmV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZCBib3JkZXIgYm9yZGVyLVsjZWVlXSBweC0zIHB5LTIgZGFyazpib3JkZXItZGFyay0zXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIHtlcnJvcnMubm9tYnJlICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXIgbXQtMVwiPntlcnJvcnMubm9tYnJlPy5tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTRcIj5cbiAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTIgYmxvY2sgdGV4dC1zbSBmb250LWJvbGQgdGV4dC1kYXJrIGRhcms6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICBodG1sRm9yPVwiYXBlbGxpZG9cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFwZWxsaWRvXG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwiYXBlbGxpZG9cIlxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIHsuLi5yZWdpc3RlcihcImFwZWxsaWRvXCIpfVxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtwZXJzb25hICYmIHBlcnNvbmEuYXBlbGxpZG99XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZCBib3JkZXIgYm9yZGVyLVsjZWVlXSBweC0zIHB5LTIgZGFyazpib3JkZXItZGFyay0zXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIHtlcnJvcnMgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlciBtdC0xXCI+e2Vycm9ycy5hcGVsbGlkbz8ubWVzc2FnZX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgZ2FwLTNcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bN3B4XSBiZy1wcmltYXJ5IHB4LTYgcHktWzdweF0gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTIgaG92ZXI6Ymctb3BhY2l0eS05MFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgR3VhcmRhclxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17Y2FuY2VsYXJ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHJvdW5kZWQtWzdweF0gYm9yZGVyIGJvcmRlci1zdHJva2UgcHgtNiBweS1bN3B4XSBmb250LW1lZGl1bSB0ZXh0LWRhcmsgaG92ZXI6c2hhZG93LTEgZGFyazpib3JkZXItZGFyay0zIGRhcms6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FuY2VsYXJcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zdGFydCBmb250LWJvbGRcIiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMnJlbVwiIH19PlxuICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICBocmVmPXtcIi9hZG1pbi11c3VhcmlvL2MvXCIgKyBleHRlcm5hbH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtYmx1ZS01MDAgaG92ZXI6dGV4dC1ibHVlLTcwMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHU+TW9kaWZpY2FyIGNyZWRlbmNpYWxlczwvdT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgIDwvRGVmYXVsdExheW91dD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm11bGFyaW9QZXJzb25hO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJ1c2VQYXJhbXMiLCJzd2FsIiwiWXVwIiwieXVwUmVzb2x2ZXIiLCJ1c2VGb3JtIiwibW9kaWZpY2FyX3BlcnNvbmEiLCJvYnRlbmVyX3BlcnNvbmEiLCJEZWZhdWx0TGF5b3V0IiwiQnJlYWRjcnVtYiIsIkxpbmsiLCJGb3JtdWxhcmlvUGVyc29uYSIsImVycm9ycyIsInJvdXRlciIsImV4dGVybmFsIiwicGVyc29uYSIsInNldFBlcnNvbmEiLCJjb25zb2xlIiwibG9nIiwidmFsaWRhdGlvblNjaGVtYSIsIm9iamVjdCIsInNoYXBlIiwibm9tYnJlIiwic3RyaW5nIiwidHJpbSIsInJlcXVpcmVkIiwiYXBlbGxpZG8iLCJjb3JyZW8iLCJlbWFpbCIsImZvcm1PcHRpb25zIiwicmVzb2x2ZXIiLCJyZWdpc3RlciIsImhhbmRsZVN1Ym1pdCIsImZvcm1TdGF0ZSIsInNldFZhbHVlIiwidGhlbiIsInJlcyIsImNvZGUiLCJkYXRvcyIsImN1ZW50YSIsImVudmlhcl9kYXRhIiwiZGF0YSIsImluZm8iLCJ0aXRsZSIsInRleHQiLCJ0YWciLCJpY29uIiwidGltZXIiLCJjbG9zZU9uRXNjIiwicHVzaCIsImVycm9yIiwiY2FuY2VsYXIiLCJkaXYiLCJjbGFzc05hbWUiLCJwYWdlTmFtZSIsImZvcm0iLCJvblN1Ym1pdCIsImxhYmVsIiwiaHRtbEZvciIsImlucHV0IiwidHlwZSIsImlkIiwiZGVmYXVsdFZhbHVlIiwibWVzc2FnZSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJzdHlsZSIsIm1hcmdpblRvcCIsImhyZWYiLCJ1Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/admin-usuario/[external]/page.tsx\n"));

/***/ })

});