import React from 'react';
import {useRef, useState, useEffect} from 'react';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@·$%]).{8,24}$/;

const Registro = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

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
    }
 
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
        <section className="min-h-screen flex flex-col items-center bg-[#76816A] p-6">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h2 className="text-3xl font-bold text-white mb-6">¡HAZTE SOCIO!</h2>
            <form onSubmit={handleSubmit}
             className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
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
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    placeholder="Nombre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76816A]"
                />

                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 a 24 caracteres.<br />
                    Debe empezar con una letra.<br />
                    Letras, números, caracteres y símbolos autorizados.
                </p>

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
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 a 24 caracteres.<br />
                    Debe incluir mayúsculas y minúsculas, un número y un símbolo.<br />
                    Símbolos permitidos: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirma la contraseña:
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
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalis={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Debe coincidir con la contraseña de arriba.
                </p>
                
                <button type="submit"
                    className="w-full py-2 bg-yellow-600 text-white font-bold rounded-md hover:bg-yellow-700"
                    
                    disabled={!validName || !validPwd || !validMatch ? true : false}>ENVIAR</button>

                <input
                    type="text"
                    placeholder="Apellido"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76816A]"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76816A]"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76816A]"
                />
                
                <div className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        className="mt-1 border-gray-300 rounded focus:ring-[#76816A]"
                    />
                    <label className="text-gray-600 text-sm">
                        Declaro que soy mayor de 18 años.
                    </label>
                </div>
                
                < className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        className="mt-1 border-gray-300 rounded focus:ring-[#76816A]"
                    />
                    <label className="text-gray-600 text-sm">
                        He leído, comprendo y acepto la Política de Privacidad y los Términos y Condiciones.
                    </label>
            </form>
            <p>
                ¿Ya estás registrado?<br />
                <span className="line">
                    {/*añadir el enlace de la ruta*/}
                    <a href="#">Login</a>
                </span>
            </p>
        </section>
        )}
     </>
    )
}

export default Registro;

