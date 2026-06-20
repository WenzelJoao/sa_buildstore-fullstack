import React from 'react'
import PatientsCounter from '../../components/counters/PatientsCounter'
import ConsultsCounter from '../../components/counters/ConsultsCounter'
import ExamsCounter from '../../components/counters/ExamsCounter'
import PatientsList from '../../components/PatientsList'

const Dashboard = () => {
    return (
        <div>
            <div className='mb-6'>
                <h1 className='text-xl font-bold text-slate-900'>Dashboard</h1>
                <p className='text-sm text-stone-600'>Resumo rapido da loja de materiais de construcao</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
                <PatientsCounter />
                <ConsultsCounter />
                <ExamsCounter />
            </div>

            {/* Lista principal */}
            <PatientsList />
        </div>
    )
}

export default Dashboard
