import React, { useRef, useState, useEffect } from 'react';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@·$%]).{8,24}$/;

const Registro = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);;
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [receiveInfo, setReceiveInfo] = useState(false); // opcional

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
}, [user])

useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
}, [pwd, matchPwd])

useEffect(() => {
    setErrMsg('');
}, [user, pwd, matchPwd])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
  //     setErrMsg("Entrada no válida");
  //     return;
  //   }
  //   // llamada al backend con los datos de registro
  //   console.log({ firstName, lastName, email, user, pwd });
  //   setSuccess(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // si el botón está activado con JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Entrada no valida");
        return;
    }
    console.log(user, pwd);
    setSuccess(true);
};

 // const canSubmit = validName && validPwd && validMatch && ageConfirmed && privacyPolicyAccepted;

  return (
    <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Login</a>
                </p>
            </section>
        ) : (
    <section className="flex flex-col items-center bg-[#76816A] min-h-screen">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="p-6 w-full max-w-md bg-[#e1d9b7] rounded-md shadow-lg mt-6">
          <h2 className="text-center text-2xl font-bold text-[#76816A] mb-6">¡HAZTE SOCIO!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
          <label htmlFor="username">
              Nombre:
              <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} /> 
              </span>
          </label>
            
            <input
              type="text"
              id="username"
              autoComplete="off"
              placeholder="Nombre"
              ref={userRef}
              value={firstName}
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />
            <input
              type="text"
              id="username"
              placeholder="Apellido"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 a 24 caracteres.<br />
                    Debe empezar con una letra.<br />
                    Letras, números, caracteres y símbolos autorizados.
            </p>

            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />
            {/* <input
              type="text"
              placeholder="Nombre de usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2"
            /> */}
            
            <label htmlFor="password">
                    Contraseña:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
            </label>
            
            <input
              type="password"
              placeholder="Contraseña"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />

            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                    8 a 24 caracteres.<br />
                    Debe incluir mayúsculas y minúsculas, un número y un símbolo.<br />
                    Símbolos permitidos: 
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
                <span aria-label="dot">.</span>
            </p>

            <input
              type="password"
              placeholder="Confirma Contraseña"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Debe coincidir con la contraseña de arriba.
            </p>

            {/* Casillas de verificación */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                required
                className="rounded"
              />
              <label>Declaro que soy mayor de 18 años. *</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={privacyPolicyAccepted}
                onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                required
                className="rounded"
              />
              <label>
                He leído y acepto la <a href="#" className="text-yellow-600">Política de privacidad</a>. *
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={receiveInfo}
                onChange={(e) => setReceiveInfo(e.target.checked)}
                className="rounded"
              />
              <label>
                Acepto recibir información por correo electrónico.
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full py-2 bg-yellow-600 text-white font-bold rounded-md"
              disabled={!validName || !validPwd || !validMatch ? true : false}>ENVIAR</button>
          </form>
          <p className="text-center text-gray-600 mt-4">¿Ya eres miembro? <a href="#" className="text-yellow-600">Inicia sesión</a></p>
        </div>
    </section>
    )}
    </>
  );
};

export default Registro;