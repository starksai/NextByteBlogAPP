import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteSearchBlog } from '@/Helpers/Routename'

export const Searchbar = () => {
    const navigate = useNavigate()
    const [query,setQuery] = useState('')

    function handleChange(e) {
        setQuery(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        navigate(RouteSearchBlog(query))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <Input type='search' placeholder="search here....." className='rounded-full bg-white' onInput={handleChange} />
            </form>
        </div>
    )
}
