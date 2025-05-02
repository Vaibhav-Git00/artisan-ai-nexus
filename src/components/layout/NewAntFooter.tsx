import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Input,
  Button,
  Divider,
  Form,
} from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  GithubOutlined,
  GlobalOutlined,
  HeartOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../styles/layout.css";

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const AntFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer className="site-footer">
      <div className="footer-content">
        <Row gutter={[48, 48]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="footer-brand">
              <Title level={3} className="footer-logo">
                <span className="footer-logo-highlight">Artisan</span>Link
              </Title>
              <Paragraph className="footer-description">
                Connecting artisans with global buyers while promoting sustainability 
                and cultural preservation. We empower traditional craftspeople and 
                preserve cultural heritage.
              </Paragraph>
              <div className="footer-stats">
                <div className="footer-stat-item">
                  <HeartOutlined className="footer-stat-icon" />
                  <div className="footer-stat-text">
                    <Text className="footer-stat-value">500+</Text>
                    <Text className="footer-stat-label">Artisans</Text>
                  </div>
                </div>
                <div className="footer-stat-item">
                  <GlobalOutlined className="footer-stat-icon" />
                  <div className="footer-stat-text">
                    <Text className="footer-stat-value">25+</Text>
                    <Text className="footer-stat-label">Countries</Text>
                  </div>
                </div>
                <div className="footer-stat-item">
                  <SafetyOutlined className="footer-stat-icon" />
                  <div className="footer-stat-text">
                    <Text className="footer-stat-value">100%</Text>
                    <Text className="footer-stat-label">Fair Trade</Text>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="footer-links-container">
              <Title level={4} className="footer-title">
                Quick Links
              </Title>
              <Row gutter={[16, 0]}>
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
                    <li className="footer-link-item">
                      <Link to="/blog" className="footer-link">
                        Blog
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
                    <li className="footer-link-item">
                      <Link to="/privacy" className="footer-link">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="footer-contact">
              <Title level={4} className="footer-title">
                Stay Connected
              </Title>
              <ul className="footer-contact-list">
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

              <div className="footer-newsletter">
                <Title level={5} className="footer-subtitle">
                  Subscribe to Newsletter
                </Title>
                <Form className="footer-form">
                  <div className="footer-form-input">
                    <Input placeholder="Your email address" className="newsletter-input" />
                    <Button type="primary" icon={<SendOutlined />} className="newsletter-button" />
                  </div>
                </Form>
              </div>

              <div className="footer-social">
                <Title level={5} className="footer-subtitle">
                  Follow Us
                </Title>
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
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <LinkedinOutlined />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <GithubOutlined />
                  </a>
                </Space>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <div className="footer-bottom">
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} md={12} className="footer-copyright">
              <Text className="copyright-text">
                &copy; {currentYear} ArtisanLink. All rights reserved.
              </Text>
            </Col>
            <Col xs={24} md={12} className="footer-legal">
              <Space split={<Divider type="vertical" className="footer-divider-vertical" />}>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
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
