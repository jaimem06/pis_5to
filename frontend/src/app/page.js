import '../login.css';

export default function Home() {
  return (
    <div class="container">
      <div class="card">
        <a class="login">Bienvenido</a>
        <div class="inputBox">
          <input type="text" required="required" />
          <span class="user">Usuario</span>
        </div>

        <div class="inputBox">
          <input type="password" required="required" />
          <span>Contraseña</span>
        </div>

        <button class="btnlogin">Iniciar Sesion</button>

      </div>
    </div>
  );
}
