import React from 'react'
import { Link } from 'react-router-dom'

import Home from './Home'

const PageNotFound = () => {
    return (
        <div>
            <h1>404 - Not Found!</h1>
            <Link to='/'> Go Home </Link>
        </div>
    )
}

export default PageNotFound
