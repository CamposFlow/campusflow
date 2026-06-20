import React from "react";

export const OverviewPanel1 = () => {


    return (
        <div>
        <div className="rounded-2xl p-7 mb-8 relative overflow-hidden"
             style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%)'}}
        >
            <div style={{
                position: 'absolute', right: '-40px', top: '-40px',
                width: '200px', height: '200px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)'
            }}/>
            <div style={{
                position: 'absolute', right: '60px', bottom: '-60px',
                width: '160px', height: '160px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)'
            }}/>
            <p className="text-blue-200 text-sm font-medium mb-1">Welcome Back</p>
            <h2 className="text-3xl font-bold mb-1 text-white">Aguwa John</h2>
            <p className="text-blue-200 text-sm">Manage student records and verify activities</p>
        </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 mb-8 gap-4">

            </div>
        </div>
    )
}