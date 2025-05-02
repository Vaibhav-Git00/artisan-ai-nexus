import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Space,
  Avatar,
  Dropdown,
  Switch,
} from "antd";
import {
  MenuOutlined,
  ShoppingOutlined,
  UserOutlined,
  HeartOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UploadOutlined,
  BookOutlined,
  InfoCircleOutlined,
  VideoCameraOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { useTheme } from "../../theme/ThemeContext";
import "../../styles/layout.css";

const { Header } = Layout;

// Mock authentication state - replace with your actual auth context
const useAuth = () => {
  // This is a mock implementation - replace with your actual auth logic
  return {
    isLoggedIn: false,
    user: null,
    isArtisan: false,
    isBuyer: false,
    isAdmin: false,
    logout: () => console.log("Logged out"),
  };
};

const AntHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, isArtisan, isBuyer, isAdmin, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to={isArtisan ? "/artisan-dashboard" : "/buyer-dashboard"}>
          Dashboard
        </Link>
      ),
      icon: <DashboardOutlined />,
    },
    {
      key: "2",
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Header className="site-header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <h1 className="site-logo">
              <span className="logo-highlight">Artisan</span>Link
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            className="nav-menu"
            items={[
              {
                key: "/marketplace",
                label: <Link to="/marketplace">Marketplace</Link>,
                icon: <ShoppingOutlined />,
              },
              ...(isLoggedIn && isArtisan
                ? [
                    {
                      key: "/artisan-dashboard",
                      label: <Link to="/artisan-dashboard">Dashboard</Link>,
                      icon: <DashboardOutlined />,
                    },
                    {
                      key: "/product-upload",
                      label: <Link to="/product-upload">Upload Product</Link>,
                      icon: <UploadOutlined />,
                    },
                    {
                      key: "/training",
                      label: <Link to="/training">Training</Link>,
                      icon: <BookOutlined />,
                    },
                  ]
                : []),
              ...(isLoggedIn && isBuyer
                ? [
                    {
                      key: "/buyer-dashboard",
                      label: <Link to="/buyer-dashboard">Dashboard</Link>,
                      icon: <DashboardOutlined />,
                    },
                    {
                      key: "/favorites",
                      label: <Link to="/favorites">Favorites</Link>,
                      icon: <HeartOutlined />,
                    },
                  ]
                : []),
              ...(isLoggedIn && isAdmin
                ? [
                    {
                      key: "/admin-dashboard",
                      label: <Link to="/admin-dashboard">Admin</Link>,
                      icon: <DashboardOutlined />,
                    },
                  ]
                : []),
              ...(!isLoggedIn
                ? [
                    {
                      key: "/stories",
                      label: <Link to="/stories">Artisan Stories</Link>,
                      icon: <VideoCameraOutlined />,
                    },
                    {
                      key: "/about",
                      label: <Link to="/about">About</Link>,
                      icon: <InfoCircleOutlined />,
                    },
                  ]
                : []),
            ]}
          />

          <Space size="middle" className="auth-buttons">
            <Switch
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              checked={isDarkMode}
              onChange={toggleTheme}
            />

            {isLoggedIn ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Avatar
                  className="user-avatar"
                  size={40}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            ) : (
              <>
                <Button type="text" className="login-button">
                  <Link to="/login">Login</Link>
                </Button>
                <Button type="primary" className="signup-button">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </Space>
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleMobileMenu}
          className="mobile-menu-button"
        />

        {/* Mobile Menu Drawer */}
        <Drawer
          title={
            <div className="logo-container">
              <h1 className="site-logo">
                <span className="logo-highlight">Artisan</span>Link
              </h1>
            </div>
          }
          placement="right"
          onClose={toggleMobileMenu}
          open={mobileMenuOpen}
          width={280}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            style={{ border: "none" }}
            items={[
              {
                key: "/marketplace",
                label: (
                  <Link to="/marketplace" onClick={toggleMobileMenu}>
                    Marketplace
                  </Link>
                ),
                icon: <ShoppingOutlined />,
              },
              ...(isLoggedIn && isArtisan
                ? [
                    {
                      key: "/artisan-dashboard",
                      label: (
                        <Link
                          to="/artisan-dashboard"
                          onClick={toggleMobileMenu}
                        >
                          Dashboard
                        </Link>
                      ),
                      icon: <DashboardOutlined />,
                    },
                    {
                      key: "/product-upload",
                      label: (
                        <Link to="/product-upload" onClick={toggleMobileMenu}>
                          Upload Product
                        </Link>
                      ),
                      icon: <UploadOutlined />,
                    },
                    {
                      key: "/training",
                      label: (
                        <Link to="/training" onClick={toggleMobileMenu}>
                          Training
                        </Link>
                      ),
                      icon: <BookOutlined />,
                    },
                  ]
                : []),
              ...(isLoggedIn && isBuyer
                ? [
                    {
                      key: "/buyer-dashboard",
                      label: (
                        <Link to="/buyer-dashboard" onClick={toggleMobileMenu}>
                          Dashboard
                        </Link>
                      ),
                      icon: <DashboardOutlined />,
                    },
                    {
                      key: "/favorites",
                      label: (
                        <Link to="/favorites" onClick={toggleMobileMenu}>
                          Favorites
                        </Link>
                      ),
                      icon: <HeartOutlined />,
                    },
                  ]
                : []),
              ...(isLoggedIn && isAdmin
                ? [
                    {
                      key: "/admin-dashboard",
                      label: (
                        <Link to="/admin-dashboard" onClick={toggleMobileMenu}>
                          Admin
                        </Link>
                      ),
                      icon: <DashboardOutlined />,
                    },
                  ]
                : []),
              ...(!isLoggedIn
                ? [
                    {
                      key: "/stories",
                      label: (
                        <Link to="/stories" onClick={toggleMobileMenu}>
                          Artisan Stories
                        </Link>
                      ),
                      icon: <VideoCameraOutlined />,
                    },
                    {
                      key: "/about",
                      label: (
                        <Link to="/about" onClick={toggleMobileMenu}>
                          About
                        </Link>
                      ),
                      icon: <InfoCircleOutlined />,
                    },
                    {
                      key: "/login",
                      label: (
                        <Link to="/login" onClick={toggleMobileMenu}>
                          Login
                        </Link>
                      ),
                      icon: <UserOutlined />,
                    },
                    {
                      key: "/signup",
                      label: (
                        <Link to="/signup" onClick={toggleMobileMenu}>
                          Sign Up
                        </Link>
                      ),
                      icon: <UserOutlined />,
                    },
                  ]
                : []),
              ...(isLoggedIn
                ? [
                    {
                      key: "logout",
                      label: (
                        <span
                          onClick={() => {
                            handleLogout();
                            toggleMobileMenu();
                          }}
                        >
                          Logout
                        </span>
                      ),
                      icon: <LogoutOutlined />,
                    },
                  ]
                : []),
            ]}
          />
        </Drawer>
      </div>
    </Header>
  );
};

export default AntHeader;
