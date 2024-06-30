import { NextResponse } from 'next/server';

async function validarTokenBackend(token) {
  const url = 'http://localhost:5000/validar_token';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Access-Tokens': token.value,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error al validar el token en el backend:', error);
    return { code: 500, msg: 'Internal Server Error' };
  }
}

export async function middleware(request) {
  const token = request.cookies.get('token');

  if (!token) {
    console.log('Middleware: Token Vacio, redirigiendo a /inicio-sesion');
    const url = new URL('/inicio-sesion', request.url);
    return NextResponse.redirect(url);
  }

  const validacion = await validarTokenBackend(token);
  if (validacion.code !== 200) {
    console.log('Middleware: Token Inválido, redirigiendo a /inicio-sesion');
    const url = new URL('/inicio-sesion', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-usuario/:path*',//aplica para todas las rutas que empiecen con /admin-usuario
    '/admin-sensor',
    '/ubicacion-sensor',
    '/configuracion-perfil',
    '/'
  ],
};