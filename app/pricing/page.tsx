import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Pricing() {
  return (
     <div style={{ maxWidth: '400px',maxHeight:'900px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 className='text-center mb-5 font-bold text-2xl'>Now Experience the Seamless Power of AI-Powered <strong className='text-primary'>Tour</strong> Planning</h2>
      <PricingTable/>
    </div>
  )
}

export default Pricing