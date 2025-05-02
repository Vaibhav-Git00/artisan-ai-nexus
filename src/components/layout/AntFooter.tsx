import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Input,
  Button,
} from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../styles/layout.css";

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const AntFooter: React.FC = () => {
  return (
    <Footer className="site-footer">
      <div className="footer-content">
        <Row gutter={[32, 32]}>
          {/* About Column */}
          <Col xs={24} sm={24} md={8} lg={8}>
            <Title level={4} className="footer-title">
              <span className="footer-logo-highlight">Artisan</span>Link
            </Title>
            <Paragraph className="footer-description">
              ArtisanLink connects traditional artisans with global buyers,
              promoting cultural preservation and sustainable practices while
              providing economic opportunities.
            </Paragraph>
            <Space size="middle" className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <TwitterOutlined />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <YoutubeOutlined />
              </a>
            </Space>
          </Col>

          {/* Quick Links Column */}
          <Col xs={24} sm={12} md={8} lg={8}>
            <Title level={4} className="footer-title">
              Quick Links
            </Title>
            <Row>
              <Col span={12}>
                <ul className="footer-links">
                  <li className="footer-link-item">
                    <Link to="/marketplace" className="footer-link">
                      Marketplace
                    </Link>
                  </li>
                  <li className="footer-link-item">
                    <Link to="/stories" className="footer-link">
                      Artisan Stories
                    </Link>
                  </li>
                  <li className="footer-link-item">
                    <Link to="/about" className="footer-link">
                      About Us
                    </Link>
                  </li>
                  <li className="footer-link-item">
                    <Link to="/contact" className="footer-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                <ul className="footer-links">
                  <li className="footer-link-item">
                    <Link to="/signup?role=artisan" className="footer-link">
                      Join as Artisan
                    </Link>
                  </li>
                  <li className="footer-link-item">
                    <Link to="/signup?role=buyer" className="footer-link">
                      Join as Buyer
                    </Link>
                  </li>
                  <li className="footer-link-item">
                    <Link to="/training" className="footer-link">
                      Training Resources
                    </Link>
                  </li>
                  <li className="footer-link-item">
                    <Link to="/faq" className="footer-link">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Contact & Newsletter Column */}
          <Col xs={24} sm={12} md={8} lg={8}>
            <Title level={4} className="footer-title">
              Stay Connected
            </Title>
            <ul className="footer-links">
              <li className="contact-item">
                <MailOutlined className="contact-icon" />
                <a href="mailto:info@artisanlink.com" className="contact-link">
                  info@artisanlink.com
                </a>
              </li>
              <li className="contact-item">
                <PhoneOutlined className="contact-icon" />
                <a href="tel:+919876543210" className="contact-link">
                  +91 9876 543 210
                </a>
              </li>
              <li className="contact-item">
                <EnvironmentOutlined className="contact-icon" />
                <Text className="contact-link">
                  123 Artisan Street, Craft District
                  <br />
                  New Delhi, 110001, India
                </Text>
              </li>
            </ul>

            <Title level={5} className="footer-title">
              Subscribe to Newsletter
            </Title>
            <Space.Compact style={{ width: "100%" }}>
              <Input placeholder="Your email address" />
              <Button
                type="primary"
                icon={<SendOutlined />}
                className="primary-button"
              />
            </Space.Compact>
          </Col>
        </Row>

        <div className="footer-bottom">
          <Row justify="space-between" align="middle">
            <Col
              xs={24}
              sm={12}
              style={{ textAlign: "center", textAlign: "left" }}
            >
              <Text className="contact-link">
                &copy; {new Date().getFullYear()} ArtisanLink. All rights
                reserved.
              </Text>
            </Col>
            <Col
              xs={24}
              sm={12}
              style={{ textAlign: "center", textAlign: "right" }}
            >
              <Space
                split={
                  <Divider
                    type="vertical"
                    style={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                  />
                }
              >
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
                <Link to="/sitemap" className="footer-link">
                  Sitemap
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </Footer>
  );
};

export default AntFooter;
