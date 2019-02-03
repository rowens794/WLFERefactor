import React, { Component } from 'react';
import HeroSection from './HeroSection/HeroSection';
import VideoSection from './VideoSection/VideoSection';
import Gamification from './Gamification/Gamification';
import ResultsFocusSection from './ResultsFocusSection/ResultsFocusSection';
import TripletSection from './TripletSection/TripletSection';

class HomePage extends Component {
    render() {
        return (
            <div>
                <HeroSection />
                <VideoSection />
                <Gamification />
                <ResultsFocusSection />
                <TripletSection />
            </div>
        );
    }
}

export default HomePage;