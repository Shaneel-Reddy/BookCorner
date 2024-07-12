import React from 'react';
import HeroComponent from '../components/HeroComponent';
import HorizontalCardScroller from '../components/HandScroller';
import UsedBookList from '../components/UsedBookList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Home() {

    return (
        <div>
          <Navbar></Navbar>
            <HeroComponent />
            <h3 className="text-center" style={{ paddingTop: "20px" }}> - Books We Love -</h3>
            <p style={{ textAlign: 'center' }}>The Best Sellers all over the World</p>
            <HorizontalCardScroller />
            <h3 className="text-center" style={{ paddingTop: "20px" }}> - Buy Used Books -</h3>
            <p style={{ textAlign: 'center' }}>Buy your favourite Book at less cost!</p>
            <UsedBookList />
            <Footer></Footer>
        </div>
    );
}
