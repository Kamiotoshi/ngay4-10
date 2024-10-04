/* global $ */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { initializeClock } from '../../js/countdown';
import exclusiveImg1 from '../../assets/img/product/e-p1.png';

const ExclusiveSection = styled.section`
  .exclusive-right .active-exclusive-product-slider .owl-nav button.owl-prev {
    position: absolute !important;
    left: 5% !important;
    top: 50% !important;
    opacity: .5 !important;
  }
  .exclusive-right .active-exclusive-product-slider .owl-nav button.owl-next {
    position: absolute !important;
    right: 5% !important;
    top: 50% !important;
    opacity: .5 !important;
  }
    .exclusive-right .active-exclusive-product-slider .owl-nav button.owl-prev:hover,
    .exclusive-right .active-exclusive-product-slider .owl-nav button.owl-next:hover {
    opacity: 1 !important;}
`;

export default function Exclusive(){
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    });
  
    useEffect(() => {
    const deadline = new Date(Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000);
    const cleanup = initializeClock(deadline, setTimeRemaining);

    $('.active-exclusive-product-slider').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      nav: true,
      dots: true,
      navText:["<img src='img/product/prev.png'>","<img src='img/product/next.png'>"]
    });

    return cleanup; // Cleanup interval khi component bị unmount
    }, []);
  
  return (
    <ExclusiveSection className="exclusive-deal-area">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 no-padding exclusive-left">
            <div className="row clock_sec clockdiv" id="clockdiv">
              <div className="col-lg-12">
                <h1>Exclusive Hot Deal Ends Soon!</h1>
                <p>Who are in extremely love with eco friendly system.</p>
              </div>
              <div className="col-lg-12">
                <div className="row clock-wrap">
                  <div className="col clockinner1 clockinner">
                    <h1 className="days">{timeRemaining.days}</h1>
                    <span className="smalltext">Days</span>
                  </div>
                  <div className="col clockinner clockinner1">
                    <h1 className="hours">{timeRemaining.hours}</h1>
                    <span className="smalltext">Hours</span>
                  </div>
                  <div className="col clockinner clockinner1">
                    <h1 className="minutes">{timeRemaining.minutes}</h1>
                    <span className="smalltext">Mins</span>
                  </div>
                  <div className="col clockinner clockinner1">
                    <h1 className="seconds">{timeRemaining.seconds}</h1>
                    <span className="smalltext">Secs</span>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" className="primary-btn">Shop Now</a>
          </div>
          <div className="col-lg-6 no-padding exclusive-right">
          <div className="active-exclusive-product-slider owl-carousel">
            {/* single exclusive carousel */}
            <div className="single-exclusive-slider">
              <img className="img-fluid" src={exclusiveImg1} alt="Exclusive Product" />
              <div className="product-details">
                <div className="price">
                  <h6>$150.00</h6>
                  <h6 className="l-through">$210.00</h6>
                </div>
                <h4>addidas New Hammer sole for Sports person</h4>
                <div className="add-bag d-flex align-items-center justify-content-center">
                  <a className="add-btn" href="#"><span className="ti-bag"></span></a>
                  <span className="add-text text-uppercase">Add to Bag</span>
                </div>
              </div>
            </div>
            {/* single exclusive carousel */}
            <div className="single-exclusive-slider">
              <img className="img-fluid" src={exclusiveImg1} alt="Exclusive Product" />
              <div className="product-details">
                <div className="price">
                  <h6>$150.00</h6>
                  <h6 className="l-through">$210.00</h6>
                </div>
                <h4>addidas New Hammer sole for Sports person</h4>
                <div className="add-bag d-flex align-items-center justify-content-center">
                  <a className="add-btn" href="#"><span className="ti-bag"></span></a>
                  <span className="add-text text-uppercase">Add to Bag</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </ExclusiveSection>
  )
}
