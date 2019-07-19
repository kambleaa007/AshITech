import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon, MDBContainer } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';


function Footer(props) {
    return (
        <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/aboutus">About</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/contactus">Contact</Link></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Our Address</h5>
                    <address>
		              Cybercity Tower 15<br />
		              AshITechnologies<br />
		              Pune<br />
		              <i className="fa fa-phone fa-lg"></i>:  +91 7387441088<br />
		              <i className="fa fa-fax fa-lg"></i>: +91 7387441088<br />
		              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:ashishkamble191191@gmail.com">
                         ashishkamble191191@gmail.com</a>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/kambleaa007"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" href="https://www.youtube.com/channel/UC-C-ly3aSptPDO3O0vm4nHA"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon btn-stackoverflow" href="http://stackoverflow.com/users/6440372/ashish-kamble"><i className="fa fa-stack-overflow"></i></a>
                        <a className="btn btn-social-icon" href="mailto:ashishkamble191191@gmail.com"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2019 AshITechnologies</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Footer;