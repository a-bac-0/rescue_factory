import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUser } from '../../services/UsersServices';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@·$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Registro = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [receiveInfo, setReceiveInfo] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
    setValidLastName(USER_REGEX.test(lastName));
  }, [firstName, lastName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [firstName, lastName, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(firstName);
    const v2 = USER_REGEX.test(lastName);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Entrada no válida");
      return;
    }

    try {
      const response = await createUser({
        firstName,
        lastName,
        email,
        pwd,
        privacyPolicyAccepted,
        receiveInfo,
      });

      if (response.success) {
        setSuccess(true);
      } else {
        setErrMsg(response.message || "Registro fallido");
      }
    } catch (err) {
      setErrMsg("Error de conexión");
    }
  };

  const canSubmit = validFirstName && validLastName && validEmail && validPwd && validMatch && ageConfirmed && privacyPolicyAccepted;

  return (
    <>
      {success ? (
        <section>
          <h1>¡Registro Exitoso!</h1>
          <p>
            <a href="/login">Inicia sesión</a>
          </p>
        </section>
      ) : (
        <section className="flex flex-col items-center bg-[#76816A] min-h-screen">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className="p-6 w-full max-w-md bg-[#e1d9b7] rounded-md shadow-lg mt-6">
            <h2 className="text-center text-2xl font-bold text-[#31442C] mb-6">¡Hazte Socio!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              <label htmlFor="firstName">
                Nombre:
                <span className={validFirstName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="firstName"
                autoComplete="off"
                ref={userRef}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby='firstNameNote'
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <p id="firstNameNote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} /> 4 a 24 caracteres.<br />
                Debe empezar con una letra.<br />
                Letras, números y símbolos permitidos.
              </p>

              <label htmlFor="lastName">
                Apellido:
                <span className={validLastName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validLastName || !lastName ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="lastName"
                autoComplete="off"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby='lastNameNote'
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <p id="lastNameNote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} /> 4 a 24 caracteres.<br />
                Debe empezar con una letra.<br />
                Letras, números y símbolos permitidos.
              </p>

              <label htmlFor="email">
                Correo Electrónico:
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='emailNote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <p id="emailNote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} /> Debe ser un correo electrónico válido (ejemplo@dominio.com).
              </p>
              
              <label htmlFor="pwd">
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
                id="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdNote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <p id="pwdNote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} /> 8 a 24 caracteres.<br />
                Debe incluir una mayúscula, una minúscula, un número y un símbolo especial (!@·$%).
              </p>

              <label htmlFor="confirm_pwd">
                Confirmar Contraseña:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmNote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <p id="confirmNote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} /> Las contraseñas deben coincidir.
              </p>

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
                <label>He leído y acepto la <a href="#" className="text-yellow-600">Política de privacidad</a>. *</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={receiveInfo}
                  onChange={(e) => setReceiveInfo(e.target.checked)}
                  className="rounded"
                />
                <label>Acepto recibir información por correo electrónico.</label>
              </div>

              <button 
                type="submit" 
                className="w-full py-2 bg-yellow-600 text-white font-bold rounded-md"
                disabled={!canSubmit}
              >
                ENVIAR
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">¿Ya eres miembro? <a href="/login" className="text-yellow-600">Inicia sesión</a></p>
          </div>
        </section>
      )}
    </>
  );
};

export default Registro;
