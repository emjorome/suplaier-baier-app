import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../context";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { username, password, onInputChange } = useForm({
    username: "",
    password: "",
  });

  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  // ---------------------------
  // Helpers de red
  // ---------------------------

  // Valida si el username existe usando el nuevo endpoint
  const validateUsername = async (u) => {
    const raw = u ?? username ?? "";
    const q = String(raw).trim();
    if (!q) {
      setUsernameIsValid(true); // no marcamos error si está vacío
      return true;
    }
    try {
      setIsCheckingUser(true);
      const resp = await fetch(
        `${apiUrl}/validarusuario?username=${encodeURIComponent(q)}`
      );

      if (!resp.ok) {
        // si el endpoint no responde 2xx, no bloqueamos el login por red
        setUsernameIsValid(true);
        return true;
      }

      const data = await resp.json();
      // Acepta cualquiera de estos formatos:
      // { exists: true|false }  ó  { rows: [...] }
      const exists =
        (typeof data?.exists === "boolean" && data.exists) ||
        (Array.isArray(data?.rows) && data.rows.length > 0);

      setUsernameIsValid(exists);
      return exists;
    } catch (err) {
      console.error("Error validando usuario:", err);
      setUsernameIsValid(true); // no bloquear por error de red
      return true;
    } finally {
      setIsCheckingUser(false);
    }
  };

  // Autenticación
  const getAuthResponse = async () => {
    const body = {
      usuario: String(username ?? "").trim(),
      pass: String(password ?? ""),
    };

    const resp = await fetch(`${apiUrl}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // si el backend devuelve [] cuando falla:
    const data = await resp.json();
    if (!Array.isArray(data) || data.length === 0) {
      setPasswordIsValid(false);
      return null;
    }
    return data[0];
  };

  // ---------------------------
  // Handlers
  // ---------------------------

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    // 1) Verifica usuario en blur/submit (por si no se hizo blur)
    const exists = await validateUsername();
    if (!exists) return; // muestra “Usuario no existe”

    // 2) Pide auth
    const user = await getAuthResponse();
    if (!user) return;

    // 3) Guarda sesión y navega
    login(user);
    switch (user.Rol) {
      case "comprador":
        navigate("/comprador", { replace: true });
        return;
      case "proveedor":
        navigate("/proveedor", { replace: true });
        return;
      default:
        navigate("/administrador", { replace: true });
        return;
    }
  };

  const onClickRegistro = () => {
    navigate("/signup", { replace: true });
  };

  // Al cambiar username, resetea mensajes
  useEffect(() => {
    setPasswordIsValid(true);
    setUsernameIsValid(true);
  }, [username]);

  return (
    <div className="loginPage">
      {/* div central */}
      <div className="loginPage__centralbox">
        <div className="loginPage__centralbox__izq">
          <img
            src="suplaier_horizontal celeste.png"
            alt="logo_suplaier"
            className="loginPage__centralbox__izq__logoImg"
          />
          <img src="/login.png" alt="login" className="loginPage__centralbox__izq__img" />
        </div>

        <div className="loginPage__centralbox__der">
          <h1 className="loginPage__title">Iniciar Sesión</h1>
          <p className="paragraph paragraph--primary">
            Inicia sesión para acceder a la aplicación
          </p>

          <div className="loginPage__centralbox__der__loginBox">
            <form onSubmit={onSubmitLogin}>
              <div className="loginPage__centralbox__der__loginBox__entryBox">
                <label htmlFor="username">
                  <p className="paragraph paragraph--sm paragraph--blue">Usuario</p>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Example"
                  className="loginPage__centralbox__der__loginBox__entryBox__input"
                  onChange={onInputChange}
                  onBlur={(e) => validateUsername(e.target.value)}
                  required
                />
                {!usernameIsValid && (
                  <p className="paragraph--red">Usuario no existe</p>
                )}
                {isCheckingUser && (
                  <p className="paragraph paragraph--sm">Verificando usuario…</p>
                )}
              </div>

              <div className="loginPage__centralbox__der__loginBox__entryBox">
                <label htmlFor="password">
                  <p className="paragraph paragraph--sm paragraph--blue">Contraseña</p>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="loginPage__centralbox__der__loginBox__entryBox__input"
                  placeholder="Password"
                  onChange={onInputChange}
                  required
                />
                {!passwordIsValid && usernameIsValid && (
                  <p className="paragraph--red">Contraseña incorrecta</p>
                )}
              </div>

              <div className="loginPage__centralbox__der__loginBox__btnBox">
                <button type="submit" className="btn btn--blue">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>

          <div className="loginPage__centralbox__der__signupBox">
            <p className="paragraph paragraph--sm paragraph--green">
              ¿Primera vez por aquí?
            </p>
            <button onClick={onClickRegistro} className="btn btn--green">
              Registrarme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
