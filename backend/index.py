from app import create_app
from jsonschema import ValidationError
from flask import jsonify, make_response, request
from controllers.utils.errors import Errors, Errors_code

app = create_app()

@app.after_request
def after_request_func(response):
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Headers', 'Accept')
        response.headers.add('Access-Control-Allow-Headers', 'X-Access-Tokens')
        response.headers.add('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            if origin:
                response.headers.add('Access-Control-Allow-Origin', origin)
    return response

@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        id = error.description.path[-1]  # se obtiene el campo que causó el error
        # Si el campo que causó el error está en el diccionario de errores
        if id in Errors_code.error:
            # Obtenemos el código de error y el mensaje
            codigo = Errors_code.error[id]
            # buscamos el mensaje en el diccionario de errores
            mensaje = Errors.error[codigo]
        else:
            # Si no está en el diccionario de errores, mostramos el mensaje por defecto
            mensaje = error.description.message
        
        return make_response(
            jsonify(
                {
                    "msg": "Error",
                    "code": 400,
                    "datos": {"error": mensaje},
                }
            ),
            400,
        )

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")