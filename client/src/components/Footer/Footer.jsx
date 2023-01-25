import Logo from '../../assets/menu.png';

const Footer = () => {
    return (
        <footer className="bg-light p-5 mb-0 vh-50">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 text-center">
                        <img src={Logo} alt="logo" height="60" width="60" />
                        <h3 style={{fontFamily: 'cursive'}}>Big Store</h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</p> */}
                        <strong>Contact Info</strong>
                        <p>(880) 170-8044344<br />engr.asadanik@gmail.com</p>
                        <a href="#" target="_blank"><i className="fab fa-facebook-square" /></a>
                        <a href="#" target="_blank"><i className="fab fa-twitter-square" /></a>
                        <a href="#" target="_blank"><i className="fab fa-instagram" /></a>
                    </div>
                    <hr className="socket" />
                    © Copywrite By Asad Anik Corporation
                </div>

            </div>
        </footer>
    )
}

export default Footer;