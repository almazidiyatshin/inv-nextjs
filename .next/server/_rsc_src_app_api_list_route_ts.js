"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_src_app_api_list_route_ts";
exports.ids = ["_rsc_src_app_api_list_route_ts"];
exports.modules = {

/***/ "(rsc)/./src/app/api/list/route.ts":
/*!***********************************!*\
  !*** ./src/app/api/list/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@14.2.5_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/server.js\");\n\nasync function POST() {\n    const res = await fetch(\"https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio\", {\n        method: \"POST\",\n        headers: {\n            Accept: \"application/json\",\n            \"Content-Type\": \"application/json\",\n            Authorization: \"Bearer \" + process.env.AUTH_TOKEN\n        },\n        body: JSON.stringify({\n            accountId: process.env.ACC_ID,\n            currency: \"RUB\"\n        }),\n        cache: \"no-store\"\n    });\n    if (!res.ok) throw new Error(\"Failed fetch response T-Invest\");\n    const data = await res.json();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9saXN0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQzJDO0FBRXBDLGVBQWVDO0lBQ3JCLE1BQU1DLE1BQU0sTUFBTUMsTUFDakIsa0hBQ0E7UUFDQ0MsUUFBUTtRQUNSQyxTQUFTO1lBQ1JDLFFBQVE7WUFDUixnQkFBZ0I7WUFDaEJDLGVBQWUsWUFBWUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQ2xEO1FBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztZQUNwQkMsV0FBV04sUUFBUUMsR0FBRyxDQUFDTSxNQUFNO1lBQzdCQyxVQUFVO1FBQ1g7UUFDQUMsT0FBTztJQUNSO0lBR0QsSUFBSSxDQUFDZixJQUFJZ0IsRUFBRSxFQUFFLE1BQU0sSUFBSUMsTUFBTTtJQUU3QixNQUFNQyxPQUEyQixNQUFNbEIsSUFBSW1CLElBQUk7SUFFL0MsT0FBT3JCLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDRDtBQUMxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2ludmVzdC8uL3NyYy9hcHAvYXBpL2xpc3Qvcm91dGUudHM/MDNmNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9ydGZvbGlvUmVzcG9uc2UgfSBmcm9tICdAL3R5cGVzL3RJbnZlc3QnO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVCgpIHtcblx0Y29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG5cdFx0J2h0dHBzOi8vaW52ZXN0LXB1YmxpYy1hcGkudGlua29mZi5ydS9yZXN0L3RpbmtvZmYucHVibGljLmludmVzdC5hcGkuY29udHJhY3QudjEuT3BlcmF0aW9uc1NlcnZpY2UvR2V0UG9ydGZvbGlvJyxcblx0XHR7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0QWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdEF1dGhvcml6YXRpb246ICdCZWFyZXIgJyArIHByb2Nlc3MuZW52LkFVVEhfVE9LRU4sXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRhY2NvdW50SWQ6IHByb2Nlc3MuZW52LkFDQ19JRCxcblx0XHRcdFx0Y3VycmVuY3k6ICdSVUInLFxuXHRcdFx0fSksXG5cdFx0XHRjYWNoZTogJ25vLXN0b3JlJyxcblx0XHR9XG5cdCk7XG5cblx0aWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcignRmFpbGVkIGZldGNoIHJlc3BvbnNlIFQtSW52ZXN0Jyk7XG5cblx0Y29uc3QgZGF0YTogSVBvcnRmb2xpb1Jlc3BvbnNlID0gYXdhaXQgcmVzLmpzb24oKTtcblxuXHRyZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJwcm9jZXNzIiwiZW52IiwiQVVUSF9UT0tFTiIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiYWNjb3VudElkIiwiQUNDX0lEIiwiY3VycmVuY3kiLCJjYWNoZSIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/list/route.ts\n");

/***/ })

};
;