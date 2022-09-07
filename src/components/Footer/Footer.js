import style from './Footer.module.css'
import { _HomepageName, _copyright, _linkFacebook, _linkInstagram, _linkTwitter, _linkWhatsapp } from '../../_defaultValues';
import { BsFacebook, BsInstagram, BsWhatsapp, BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Footer() {
    const size = 35;

    return (
        <div className={style.footer}>
            <div className={style.main}>
                <div className={style.navbar}>
                    <div className={style.sozialMedia}>
                        <div className={style.sozial}>
                            <a href={_linkFacebook} target="_blank" rel="noopener noreferrer">
                                <BsFacebook size={size} />
                            </a>
                        </div>
                        <div className={style.sozial}>
                            <a href={_linkInstagram} target="_blank" rel="noopener noreferrer">
                                <BsInstagram size={size} />
                            </a>
                        </div>
                        <div className={style.sozial}>
                            <a href={_linkWhatsapp} target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp size={size} />
                            </a>
                        </div>
                        <div className={style.sozial}>
                            <a href={_linkTwitter} target="_blank" rel="noopener noreferrer">
                                <BsTwitter size={size} />
                            </a>
                        </div>
                    </div>
                </div>
                <address>
                    Pascal Thurow <br />
                    Otto-Hahn Str. 7 <br />
                    95145 Oberkotzau <br />
                    Deutschland
                </address>
            </div>
            <Link to="/contact" className={style.link}>Contact us</Link>
            <hr />
            <p className={style.copyright}>Ⓒ  {_copyright} {_HomepageName}</p>
        </div>
    );

}

export default Footer;