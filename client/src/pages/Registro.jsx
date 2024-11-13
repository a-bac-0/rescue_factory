import React, { useRef, useState, useEffect } from 'react'; 
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useUserContext } from '../context/UserContext'; 
import { createUser } from '../services/UsersServices'; 

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
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Entrada no válida");
        return;
    }
    try { 
        const response = await createUser({ 
            firstName, 
            lastName, 
            email, 
            username: user, 
            password: pwd, 
        }); 
        if (response.success) { 
            setSuccess(true); 
        } else { 
            setErrMsg(response.message || "Registro fallido"); 
        } 
    } catch (error) { 
        setErrMsg("Error de conexión"); 
    } 
};

  const canSubmit = validName && validPwd && validMatch && ageConfirmed && privacyPolicyAccepted;

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
              
              <label htmlFor="username">Nombre:</label>
              <input
                type="text"
                id="firstName"
                ref={userRef}
                value={user}
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={!validName}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!validName && user ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>

              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={!validPwd}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!validPwd && pwd ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>

              <label htmlFor="confirm_pwd">Confirma Contraseña:</label>
              <input
                type="password"
                id="confirm_pwd"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2"
              />
              <span className={validMatch ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!validMatch && matchPwd ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                  required
                />
                <label>Declaro que soy mayor de 18 años.</label>
              </div>

              <button 
                type="submit" 
                disabled={!canSubmit}
                className={`w-full py-2 rounded-md ${canSubmit ? 'bg-yellow-600 text-white' : 'bg-gray-400 text-gray-600'}`}
              >
                Enviar
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Registro;
