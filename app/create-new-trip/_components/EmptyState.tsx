import { suggestion } from '@/app/_components/Hero'
import React from 'react'

function EmptyState({onSelectOption}:any) {
  return (
    <div className='mt-2'>
        <h2 className='font-bold text-center text-3xl'>Start Planning you <strong className='text-primary'>Trip</strong> using AI</h2>
        <p className='text-gray-400 mt-2 text-center'>Discover personalised travel itenaries and find the best destinations and plan your dream vaccation effortlessyly with the power of AI. Let our Smart assistant do the stuffs for you</p>
         <div className="flex flex-col gap-5 mt-5">
                  {suggestion.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:bg-primary hover:text-white transition-all"
                      onClick={() => onSelectOption(item.title)}
                    >
                      {item.icon}
                      <h2 className="text-lg">{item.title}</h2>
                    </div>
                  ))}
                </div>
    </div>
  )
}

export default EmptyState