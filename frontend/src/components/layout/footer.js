import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="section">
        <div style={{ paddingRight: "20px" }}>
          <p>서비스</p>
          <div>
            <a>소복소복</a>
          </div>
          <div>
            <a>소복소복</a>
          </div>
        </div>
        <div style={{ paddingRight: "20px" }}>
          <p>문의</p>
          <div>
            <a>FAQ</a>
          </div>
          <div>
            <a>1대1문의</a>
          </div>
        </div>
        <div style={{ paddingRight: "20px" }}>
          <p>고객센터</p>
          <div>
            <a>대표문의: soboksobok.service@gmail.com</a>
          </div>
          <div>
            <a>보건복지상담센터 129</a>
          </div>
        </div>
      </div>
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
