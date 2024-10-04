import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div>
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Shopping Cart</h1>
                            <nav className="d-flex align-items-center">
                                <Link to={'/'}>
                                    Home
                                    <span className="lnr lnr-arrow-right" />
                                </Link>
                                <a href=''>Cart</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner