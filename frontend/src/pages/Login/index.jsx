import React from 'react'
import LoginForm from '../../components/LoginForm'

const Login = () => {
    return (
        <>
            <div className='flex min-h-screen bg-stone-100'>
                <div className='hidden md:flex w-1/2 bg-slate-900 text-white flex-col justify-center p-12'>
                    <div className='max-w-lg'>
                        <div className='mb-8 flex items-center gap-3'>
                            <div className='flex h-12 w-12 items-center justify-center rounded bg-amber-500 text-2xl font-black text-slate-950'>
                                B
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold'>BuildStore Materiais</h1>
                                <p className='text-sm text-stone-300'>Gestao interna da loja</p>
                            </div>
                        </div>

                        <h2 className='mb-4 text-4xl font-bold leading-tight'>
                            Controle simples para produtos, estoque e vendas.
                        </h2>
                        <p className='text-base text-stone-300'>
                            Sistema interno para organizar materiais de construcao, acompanhar estoque e registrar compras com rapidez.
                        </p>

                        <div className='mt-8 grid grid-cols-3 gap-3 text-sm'>
                            <div className='rounded border border-slate-700 bg-slate-800 p-3'>
                                Cimento
                            </div>
                            <div className='rounded border border-slate-700 bg-slate-800 p-3'>
                                Tijolo
                            </div>
                            <div className='rounded border border-slate-700 bg-slate-800 p-3'>
                                Tinta
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full md:w-1/2 items-center justify-center p-4 sm:p-8'>
                    <div className='w-full flex justify-center items-center'>
                        <div className='mb-6 flex items-center justify-center gap-3 md:hidden'>
                            <div className='flex h-11 w-11 items-center justify-center rounded bg-amber-500 text-xl font-black text-slate-950'>
                                B
                            </div>
                            <div>
                                <h1 className='text-xl font-bold text-slate-900'>BuildStore Materiais</h1>
                                <p className='text-sm text-stone-600'>Gestao interna da loja</p>
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
