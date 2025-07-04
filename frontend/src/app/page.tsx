import Image from "next/image";
import logo from "./_assets/Logo.png";
import dbimg from './_assets/DownloadOutline.png';
import Background from './_assets/Group.png';
import icon1 from './_assets/insta.svg';
import icon2 from './_assets/FB.svg';
import icon3 from './_assets/yt.svg';

export default function UnderConstruction() {
  // Use Background.src for CSS URL
  const backgroundImageStyle = {
    backgroundImage: `url(${Background.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    minHeight: '100vh',
    width: '100%',
  };

  const headingStyle = {
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)'
  };

  return (
    <div style={backgroundImageStyle} className="relative text-black">
      <nav className="flex justify-between items-center p-8">
        <Image alt="" src={logo} className="w-[138px] sm:w-[307px]" />
        <a href="/Brochure.pdf" download>
          <button className="flex items-center border-2 border-black rounded-md p-2 sm:p-4">
            <h1 className="text-[#AF0034] font-semibold text-[18px] sm:text-[25.5px] mr-2">
              Download Brochure
            </h1>
            <Image alt="" src={dbimg} className="w-[1rem] sm:w-[2rem]" />
          </button>
        </a>
      </nav>

      <div className="flex flex-col items-center justify-center mx-4 sm:mx-16 relative z-10">
        <h1 style={headingStyle} className="font-bold text-[30px] sm:text-[96px] text-center mt-8 text-[#5D3B1F]">
          WEBSITE IS UNDER <span className="text-[#AF0034]">CONSTRUCTION</span> !
        </h1>
        
        <p className="font-semibold text-[17px] sm:text-[40px] text-center max-w-[90%] md:max-w-[55%] my-8 text-[#5D3B1F]">
          Secure your spot and be the first to experience our exciting things by{' '}
          <span className="text-[#AF0034]">pre-registering</span> through the following link!
        </p>

        <a href="/preregistration">
          <div className="border-2 sm:border-4 border-[#AF0034] rounded-xl px-6 py-2 sm:px-8 sm:py-4 cursor-pointer mb-8">
            <h2 className="font-semibold text-[18px] sm:text-[32px] text-center text-[#5D3B1F]">
              PRE REGISTER NOW !
            </h2>
          </div>
        </a>

        <div className="flex flex-col items-center py-8">
          <h2 className="text-[#AF0034] font-medium text-[24px] sm:text-[40px] mb-4">
            CONTACT US:
          </h2>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/gambitor.iitr?igsh=MXc3dWM3MW9vZzNyNA==">
              <Image alt="Instagram" src={icon1} className="w-[2rem] sm:w-[2.5rem]" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100094215150920&mibextid=ZbWKwL">
              <Image alt="Facebook" src={icon2} className="w-[2rem] sm:w-[2.5rem]" />
            </a>
            <a href="https://youtube.com/@gambitoriitroorkee?si=FQNreC2Tvj7nMPRz">
              <Image alt="YouTube" src={icon3} className="w-[2.5rem] sm:w-[3rem]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
