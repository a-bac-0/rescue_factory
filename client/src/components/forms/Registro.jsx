import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
      setErrMsg("Entrada no válida");
      return;
    }
    // Aquí deberás hacer la llamada a tu backend con los datos de registro
    console.log({ firstName, lastName, email, user, pwd });
    setSuccess(true);
  };

  const canSubmit = validName && validPwd && validMatch && ageConfirmed && privacyPolicyAccepted;

  return (
    <section className="flex flex-col items-center bg-[#76816A] min-h-screen">
      {success ? (
        <div className="text-white text-center mt-8">
          <h2>¡Registro Exitoso!</h2>
          <p><a href="#" className="text-yellow-600">Inicia sesión</a></p>
        </div>
      ) : (
        <div className="p-6 w-full max-w-md bg-[#e1d9b7] rounded-md shadow-lg mt-6">
          <h2 className="text-center text-2xl font-bold text-[#76816A] mb-6">¡HAZTE SOCIO!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              ref={userRef}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />
            <input
              type="email"
              placeholder="Email"
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
            <input
              type="password"
              placeholder="Contraseña"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />
            <input
              type="password"
              placeholder="Confirma Contraseña"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2"
            />

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
              disabled={!canSubmit}
            >
              ENVIAR
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">¿Ya eres miembro? <a href="#" className="text-yellow-600">Inicia sesión</a></p>
        </div>
      )}
    </section>
  );
};

export default Registro;