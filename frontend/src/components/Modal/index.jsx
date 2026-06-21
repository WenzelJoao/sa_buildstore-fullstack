import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative'>
                <button
                    onClick={onClose}
                    className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg cursor-pointer'
                >
                    x
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal
