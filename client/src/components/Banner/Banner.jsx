import "./Banner.css";
import slider1stImg from '../../assets/slider/1.jpg';
import slider2ndImg from '../../assets/slider/2.jpg';
import slider3rdImg from '../../assets/slider/3.jpg';

const Banner = () => {
    return (
        <>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval={1000}>
                        <img src={slider3rdImg} className="d-block w-100 slider-img" alt="1st Slider" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Find Your Awesome Packges</h3>
                            <p>Some representative placeholder content for the first slide.</p>
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval={2000}>
                        <img src={slider1stImg} className="d-block w-100 slider-img" alt="2nd Slider" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Go For Latest Laptops</h3>
                            <p>Some representative placeholder content for the second slide.</p>
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={slider2ndImg} className="d-block w-100 slider-img" alt="3rd Slider" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Happy With Family</h3>
                            <p>Some representative placeholder content for the third slide.</p>
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </>
    );
};

export default Banner;