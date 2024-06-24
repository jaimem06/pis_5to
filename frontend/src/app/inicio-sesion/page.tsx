'use client';
import './login.css';
import { login } from '@/hooks/authenticate';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface FormData {
  correo: string;
  clave: string;
}

export default function Login() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    correo: Yup.string().trim().required('El correo es requerido'),
    clave: Yup.string().trim().required('La clave es requerida')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm<FormData>(formOptions);

  const sendInfo = (data: FormData) => {
    login(data).then((info) => {
      if (info.code == '200') {
        console.log(info);
        Cookies.set('token', info.datos.token);
        Cookies.set('user', info.datos.user);
        Cookies.set('external', info.datos.external);
        console.log(info.datos.user);
        swal({
          title: "Info",
          text: "Bienvenido " + info.datos.user,
          icon: "success",
          timer: 4000,
          closeOnEsc: true,
        });
        router.push('/');
        router.refresh();
      } else {
        swal({
          title: "Error",
          text: info.datos.error,
          icon: "error",
          timer: 4000,
          closeOnEsc: true,
        });
        console.log(info);
        console.log("NO");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(sendInfo)}>
      <div className="container">
        <div className="card">
          <a className="login">Bienvenido</a>
          <div className="inputBox">
            <input type="text" required {...register('correo')} />
            <span className="user">Usuario</span>
          </div>

          <div className="inputBox">
            <input type="password" required {...register('clave')} />
            <span>Contraseña</span>
          </div>
          <button type="submit" className="btnlogin">Iniciar Sesion</button>
        </div>
      </div>
    </form>
  );
}