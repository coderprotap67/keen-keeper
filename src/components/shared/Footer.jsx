import Logo from "../../assets/logo-xl.png"
import Fb from "../../assets/facebook.png"
import Insta from "../../assets/instagram.png"
import X from "../../assets/twitter.png"

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-[#244D3F] text-white py-20">
      <aside>
        <img src={Logo} alt="KeenKeeper's Logo" className="w-50" />
        <p className="text-white/80 mt-4 max-w-sm md:max-w-lg">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
      </aside>
      <nav>
        <p className="text-white text-md font-medium">Social Links:</p>
        <div className="grid grid-flow-col gap-4">
          <img src={Insta} alt="Instagram Icon" />
          <img src={Fb} alt="Facebook Icon" />
          <img src={X} alt="X Icon" />
        </div>
      </nav>
      <div className="flex flex-col md:flex-row justify-between border-t border-[#FAFAFA]/50 pt-8 px-10 lg:px-52 w-full">
        <p className="text-[#FAFAFA]/50">
          ©{new Date().getFullYear()} KeenKeeper - All right reserved
        </p>
        <div className="text-[#FAFAFA]/50 flex gap-4">
          <p>Privacy Policy</p>
          <p>Terms and Service</p>
          <p>Cookies</p>
        </div>
      </div>
    </footer>
  );
}
