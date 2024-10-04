import React from 'react';
import brandImg1 from '../../assets/img/brand/1.png';
import brandImg2 from '../../assets/img/brand/2.png';
import brandImg3 from '../../assets/img/brand/3.png';
import brandImg4 from '../../assets/img/brand/4.png';
import brandImg5 from '../../assets/img/brand/5.png';

function Brand() {
    const brands = [
      { id: 1, image: brandImg1, alt: 'Brand 1' },
      { id: 2, image: brandImg2, alt: 'Brand 2' },
      { id: 3, image: brandImg3, alt: 'Brand 3' },
      { id: 4, image: brandImg4, alt: 'Brand 4' },
      { id: 5, image: brandImg5, alt: 'Brand 5' },
    ];
  
    return (
      <section className="brand-area section_gap">
        <div className="container">
          <div className="row">
            {brands.map((brand) => (
              <a key={brand.id} className="col single-img" href="/">
                <img className="img-fluid d-block mx-auto" src={brand.image} alt={brand.alt} />
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

export default Brand