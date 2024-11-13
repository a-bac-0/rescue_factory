import React from 'react'

const Alert = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#76816A] border p-4 rounded shadow-md text-center w-80">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-evenly">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-[#D1B85E] text-black rounded hover:bg-[#77633D] disabled:bg-blue-300"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Alert
