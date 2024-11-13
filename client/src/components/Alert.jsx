// Alert.js
import React from 'react'

const Alert = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md text-center w-80">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-evenly">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Alert
