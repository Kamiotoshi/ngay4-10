import { Link } from "react-router-dom";

export default function ConfirmationBanner() {
    return(
        <section class="banner-area organic-breadcrumb">
            <div class="container">
                <div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                    <div class="col-first">
                        <h1>Confirmation</h1>
                        <nav class="d-flex align-items-center">
                            <Link to={'/'}>Home<span class="lnr lnr-arrow-right"></span></Link>
                            <a href="category.html">Confirmation</a>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    )
}