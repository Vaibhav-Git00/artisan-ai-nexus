import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Card,
  Space,
  Avatar,
  Carousel,
  ConfigProvider,
  theme,
  Divider,
  Tag,
  Statistic,
  Image,
  Badge,
  BackTop,
  Affix,
} from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  HeartOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  RocketOutlined,
  TeamOutlined,
  SafetyOutlined,
  ArrowRightOutlined,
  StarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import AntHeader from "@/components/layout/AntHeader";
import AntFooter from "@/components/layout/AntFooter";
import { motion } from "framer-motion";
import "../styles/new-home-page.css";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

// Custom hook for scroll position
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

const HomePage: React.FC = () => {
  const { token } = useToken();
  const scrollPosition = useScrollPosition();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      title: "Handwoven Bamboo Basket",
      description: "Meticulously crafted using traditional techniques",
      price: "₹1,200",
      location: "Assam, India",
      image:
        "https://images.unsplash.com/photo-1595397551849-e31e17f64ea7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      isFeatured: true,
      isNew: false,
    },
    {
      id: 2,
      title: "Madhubani Painting - Tree of Life",
      description: "Traditional art using natural pigments",
      price: "₹2,500",
      location: "Bihar, India",
      image:
        "https://images.unsplash.com/photo-1584283367830-7875dd4543a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      isFeatured: true,
      isNew: true,
    },
    {
      id: 3,
      title: "Handloom Cotton Scarf",
      description: "Naturally dyed and sustainably produced",
      price: "₹850",
      location: "Rajasthan, India",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      isFeatured: false,
      isNew: true,
    },
    {
      id: 4,
      title: "Blue Pottery Tea Set",
      description: "Hand-painted with traditional motifs",
      price: "₹3,200",
      location: "Jaipur, India",
      image:
        "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      isFeatured: true,
      isNew: false,
    },
    {
      id: 5,
      title: "Sandalwood Elephant Figurine",
      description: "Intricately carved by master craftsmen",
      price: "₹4,500",
      location: "Karnataka, India",
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      isFeatured: false,
      isNew: false,
    },
    {
      id: 6,
      title: "Brass Dhokra Wall Art",
      description: "Ancient lost-wax casting technique",
      price: "₹5,800",
      location: "Odisha, India",
      image:
        "https://images.unsplash.com/photo-1629976001386-a4b8b3a0745c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      isFeatured: true,
      isNew: true,
    },
  ];

  // Artisan stories data
  const artisanStories = [
    {
      id: 1,
      name: "Lakshmi Devi",
      role: "Madhubani Artist",
      location: "Bihar",
      quote:
        "Through my paintings, I preserve the stories and traditions that have been passed down through generations in my family.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Bamboo Craftsman",
      location: "Assam",
      quote:
        "Working with bamboo connects me to nature and allows me to create sustainable products that last for generations.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Textile Weaver",
      location: "Rajasthan",
      quote:
        "Each thread I weave carries the cultural heritage of my community and the skills I learned from my grandmother.",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E07A5F",
          borderRadius: 8,
          colorBgContainer: "#ffffff",
          fontFamily:
            "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Layout: {
            bodyBg: "#ffffff",
            headerBg: "#ffffff",
            footerBg: "#333333",
          },
          Button: {
            primaryColor: "#ffffff",
            defaultBg: "#ffffff",
          },
          Card: {
            colorBorderSecondary: "transparent",
          },
        },
      }}
    >
      <Layout className="layout">
        <AntHeader />

        <Content className="site-content">
          {/* Hero Section */}
          <motion.div
            className="hero-section"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="hero-text-container"
              >
                <Title level={1} className="hero-title">
                  Discover Authentic <span className="highlight">Artisan</span>{" "}
                  Crafts
                </Title>
                <Title level={3} className="hero-subtitle">
                  Connecting artisans with global buyers while promoting
                  sustainability and cultural preservation
                </Title>
                <Space size="large" className="hero-buttons">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingOutlined />}
                    className="primary-button"
                  >
                    <Link to="/marketplace">Browse Marketplace</Link>
                  </Button>
                  <Button
                    size="large"
                    icon={<UserOutlined />}
                    className="secondary-button"
                  >
                    <Link to="/signup">Join ArtisanLink</Link>
                  </Button>
                </Space>
              </motion.div>
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Row gutter={[24, 24]} className="stats-row">
                  <Col xs={8}>
                    <Statistic
                      title="Artisans"
                      value={500}
                      prefix={<TeamOutlined />}
                    />
                  </Col>
                  <Col xs={8}>
                    <Statistic
                      title="Products"
                      value={2500}
                      prefix={<ShoppingOutlined />}
                    />
                  </Col>
                  <Col xs={8}>
                    <Statistic
                      title="Countries"
                      value={25}
                      prefix={<GlobalOutlined />}
                    />
                  </Col>
                </Row>
              </motion.div>
            </div>
          </motion.div>

          {/* Categories Section */}
          <div className="categories-section">
            <div className="content-wrapper">
              <Title level={2} className="section-title text-center">
                Explore Categories
              </Title>
              <Row gutter={[16, 16]} className="categories-row">
                <Col xs={12} sm={8} md={4}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="category-item"
                  >
                    <div className="category-icon textile"></div>
                    <Text strong>Textiles</Text>
                  </motion.div>
                </Col>
                <Col xs={12} sm={8} md={4}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="category-item"
                  >
                    <div className="category-icon pottery"></div>
                    <Text strong>Pottery</Text>
                  </motion.div>
                </Col>
                <Col xs={12} sm={8} md={4}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="category-item"
                  >
                    <div className="category-icon jewelry"></div>
                    <Text strong>Jewelry</Text>
                  </motion.div>
                </Col>
                <Col xs={12} sm={8} md={4}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="category-item"
                  >
                    <div className="category-icon woodwork"></div>
                    <Text strong>Woodwork</Text>
                  </motion.div>
                </Col>
                <Col xs={12} sm={8} md={4}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="category-item"
                  >
                    <div className="category-icon painting"></div>
                    <Text strong>Paintings</Text>
                  </motion.div>
                </Col>
                <Col xs={12} sm={8} md={4}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="category-item"
                  >
                    <div className="category-icon metalwork"></div>
                    <Text strong>Metalwork</Text>
                  </motion.div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Features Section */}
          <motion.div
            className="features-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
          >
            <div className="content-wrapper">
              <Row gutter={[48, 48]} align="middle">
                <Col xs={24} lg={12}>
                  <motion.div variants={fadeInLeft}>
                    <Title level={2} className="section-title">
                      Why Choose <span className="highlight">ArtisanLink</span>?
                    </Title>
                    <Paragraph className="section-description">
                      We connect artisans with global buyers, promoting cultural
                      preservation and sustainable practices while providing
                      economic opportunities.
                    </Paragraph>
                    <div className="features-list">
                      <motion.div variants={fadeIn} className="feature-item">
                        <GlobalOutlined className="feature-icon" />
                        <div className="feature-text">
                          <Text strong>Global Reach</Text>
                          <Text type="secondary">
                            Connect with buyers worldwide
                          </Text>
                        </div>
                      </motion.div>
                      <motion.div variants={fadeIn} className="feature-item">
                        <HeartOutlined className="feature-icon" />
                        <div className="feature-text">
                          <Text strong>Cultural Preservation</Text>
                          <Text type="secondary">
                            Share your heritage globally
                          </Text>
                        </div>
                      </motion.div>
                      <motion.div variants={fadeIn} className="feature-item">
                        <SafetyOutlined className="feature-icon" />
                        <div className="feature-text">
                          <Text strong>Fair Trade Practices</Text>
                          <Text type="secondary">
                            Transparent and ethical business
                          </Text>
                        </div>
                      </motion.div>
                      <motion.div variants={fadeIn} className="feature-item">
                        <RocketOutlined className="feature-icon" />
                        <div className="feature-text">
                          <Text strong>Digital Empowerment</Text>
                          <Text type="secondary">
                            Access modern marketplace tools
                          </Text>
                        </div>
                      </motion.div>
                    </div>
                    <Button
                      type="primary"
                      size="large"
                      className="primary-button mt-20"
                    >
                      <Link to="/about">Learn More About Us</Link>
                    </Button>
                  </motion.div>
                </Col>
                <Col xs={24} lg={12}>
                  <motion.div
                    variants={fadeInRight}
                    className="features-image-container"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                      alt="Artisan crafting"
                      className="features-image"
                      preview={false}
                    />
                  </motion.div>
                </Col>
              </Row>
            </div>
          </motion.div>

          {/* Featured Products Section */}
          <div className="products-section">
            <div className="content-wrapper">
              <div className="section-header">
                <Title level={2} className="section-title">
                  Featured Artisan Products
                </Title>
                <Button type="link" className="view-all-link">
                  <Link to="/marketplace">
                    View All <ArrowRightOutlined />
                  </Link>
                </Button>
              </div>

              <Row gutter={[24, 32]}>
                {featuredProducts.map((product) => (
                  <Col xs={24} sm={12} md={8} key={product.id}>
                    <motion.div
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Badge.Ribbon
                        text={product.isNew ? "New" : "Featured"}
                        color={product.isNew ? "#52c41a" : "#E07A5F"}
                        style={{
                          display:
                            product.isNew || product.isFeatured
                              ? "block"
                              : "none",
                        }}
                      >
                        <Card
                          hoverable
                          className="product-card"
                          cover={
                            <div className="product-image-container">
                              <img
                                alt={product.title}
                                src={product.image}
                                className="product-image"
                              />
                              <div className="product-overlay">
                                <Button
                                  type="primary"
                                  shape="circle"
                                  icon={<ShoppingOutlined />}
                                />
                                <Button
                                  shape="circle"
                                  icon={<HeartOutlined />}
                                />
                              </div>
                            </div>
                          }
                        >
                          <div className="product-location">
                            <EnvironmentOutlined /> {product.location}
                          </div>
                          <Card.Meta
                            title={product.title}
                            description={product.description}
                          />
                          <div className="product-footer">
                            <Text strong className="product-price">
                              {product.price}
                            </Text>
                            <div className="product-rating">
                              <StarOutlined /> {product.rating}
                            </div>
                          </div>
                        </Card>
                      </Badge.Ribbon>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              <div className="text-center mt-40">
                <Button type="primary" size="large" className="primary-button">
                  <Link to="/marketplace">
                    Explore All Products
                    <ArrowRightOutlined style={{ marginLeft: 8 }} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="impact-section">
            <div className="content-wrapper">
              <Row gutter={[48, 48]} align="middle">
                <Col xs={24} lg={12} className="order-lg-2">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInRight}
                  >
                    <Title level={2} className="section-title">
                      Our <span className="highlight">Impact</span>
                    </Title>
                    <Paragraph className="section-description">
                      ArtisanLink is more than a marketplace. We're a movement
                      to preserve cultural heritage, promote sustainable
                      practices, and create economic opportunities for artisans
                      worldwide.
                    </Paragraph>

                    <Row gutter={[16, 16]} className="impact-stats">
                      <Col span={12}>
                        <Card className="impact-card">
                          <Statistic
                            title="Artisan Income Increase"
                            value={40}
                            suffix="%"
                            valueStyle={{ color: "#E07A5F" }}
                            prefix={<ThunderboltOutlined />}
                          />
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card className="impact-card">
                          <Statistic
                            title="Traditional Techniques Preserved"
                            value={120}
                            valueStyle={{ color: "#E07A5F" }}
                            prefix={<SafetyOutlined />}
                          />
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card className="impact-card">
                          <Statistic
                            title="Sustainable Materials Used"
                            value={85}
                            suffix="%"
                            valueStyle={{ color: "#E07A5F" }}
                            prefix={<CheckCircleOutlined />}
                          />
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card className="impact-card">
                          <Statistic
                            title="Communities Supported"
                            value={75}
                            valueStyle={{ color: "#E07A5F" }}
                            prefix={<TeamOutlined />}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </motion.div>
                </Col>
                <Col xs={24} lg={12} className="order-lg-1">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInLeft}
                    className="impact-image-container"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                      alt="Artisan community"
                      className="impact-image"
                      preview={false}
                    />
                  </motion.div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Artisan Stories Section */}
          <div className="stories-section">
            <div className="content-wrapper">
              <Title level={2} className="section-title text-center">
                Artisan Stories
              </Title>
              <Paragraph className="section-subtitle text-center">
                Meet the talented creators behind our unique products
              </Paragraph>

              <Row gutter={[32, 32]}>
                {artisanStories.map((artisan) => (
                  <Col xs={24} md={8} key={artisan.id}>
                    <motion.div
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Card bordered={false} className="story-card">
                        <div className="story-header">
                          <Avatar
                            size={80}
                            src={artisan.avatar}
                            className="story-avatar"
                          />
                          <div className="story-meta">
                            <Title level={4} className="story-name">
                              {artisan.name}
                            </Title>
                            <Text type="secondary">
                              {artisan.role}, {artisan.location}
                            </Text>
                          </div>
                        </div>
                        <Paragraph className="story-quote">
                          "{artisan.quote}"
                        </Paragraph>
                        <Button type="link" className="story-link">
                          Read Full Story <ArrowRightOutlined />
                        </Button>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              <div className="text-center mt-40">
                <Button
                  type="default"
                  size="large"
                  className="secondary-button"
                >
                  <Link to="/stories">View All Stories</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <motion.div
            className="full-width-section cta-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="content-container">
              <Title level={2} className="cta-title">
                Join the ArtisanLink Community
              </Title>
              <Paragraph className="cta-description">
                Whether you're an artisan looking to expand your reach or a
                buyer seeking authentic handcrafted products, ArtisanLink is
                your platform.
              </Paragraph>
              <Space size="large" className="hero-buttons">
                <Button
                  size="large"
                  type="primary"
                  ghost
                  style={{
                    height: "50px",
                    fontSize: "16px",
                    padding: "0 30px",
                  }}
                >
                  <Link to="/signup?role=artisan">Join as Artisan</Link>
                </Button>
                <Button
                  size="large"
                  style={{
                    backgroundColor: "white",
                    color: "#E07A5F",
                    borderColor: "white",
                    height: "50px",
                    fontSize: "16px",
                    padding: "0 30px",
                  }}
                >
                  <Link to="/signup?role=buyer">Join as Buyer</Link>
                </Button>
              </Space>
            </div>
          </motion.div>
        </Content>

        <AntFooter />
      </Layout>
    </ConfigProvider>
  );
};

export default HomePage;
