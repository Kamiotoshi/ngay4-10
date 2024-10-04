import React, { useState, useEffect } from 'react';
import { initializeClock } from '../../js/countdown';
import Banner from '../common/banner';
import Features from '../common/features';
import Category from '../common/category';
import Product from '../common/product';
import Exclusive from '../common/exclusive';
import Brand from '../common/brand';
import RelatedProductArea from '../common/relatedProductArea';

	export default function Home(){
		const [timeRemaining, setTimeRemaining] = useState({
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		  });
		
		  useEffect(() => {
			const deadline = new Date(Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000);
			const cleanup = initializeClock(deadline, setTimeRemaining);
			return cleanup; 
		  }, []);
		return (
			<div>
				<Banner />
				<Features />
				<Category />
				<Product />
				<Exclusive />
				<Brand />
				<RelatedProductArea />
			</div>        
		)
	}
	
	  