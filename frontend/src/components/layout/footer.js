import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="address">
        <p>SOBOKSOBOK / 소복소복</p>
        <p>광주광역시 광산구 하남산단 6번로 107(삼성전자)</p>
      </div>
      <div className="logo">
        <div>
          개인정보 처리방침 | 이용약관 | 소복소복소개 <br></br> Copyright by
          SOBOKSOBOK
        </div>
        <img
          src="soboksobok_logo/sobok_s.png"
          style={{ width: 150 }}
          alt="logo"
        />
        {/* <div>Copyright by SOBOKSOBOK</div> */}
        <div style={{ width: "20vw" }}></div>
      </div>
    </footer>
  );
};
export default Footer;
