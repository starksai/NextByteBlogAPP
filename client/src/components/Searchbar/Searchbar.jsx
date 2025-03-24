import React from 'react'
import { Input } from '../ui/input'


export const Searchbar = () => {
    return (
        <div>
            <form >
                <Input type='search' placeholder="search here....." className='rounded-full bg-white' />
            </form>
        </div>
    )
}
