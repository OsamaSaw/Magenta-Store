import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState } from "store";
import { SubMenuViewer } from "./subMenuViewer";
import { videoGames, cards, psn } from "utils/data/MenuData";
import { MenuItem } from "components/header/MenuItem";

type HeaderType = {
  isErrorPage?: Boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const allMenus = [videoGames, cards, psn];
  const [menuNumber, setMenuNumber] = useState(0);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const userName = useSelector((state: RootState) => state.user.user);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            E-Shop
          </h1>
        </Link>
        <div className="miniContainer">
          <div className="searchBox">
            <input
              style={{
                width: "90%",
                alignSelf: "center",
                color: "black",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <div className="searchButton">
              <i
                onClick={() => setSearchOpen(!searchOpen)}
                className="icon-search"
              ></i>
            </div>
          </div>
          <div
            // className="menu space-x-5"
            ref={navRef}
            className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          >
            <MenuItem
              showSubMenu={showSubMenu}
              menuNumber={menuNumber}
              setShowSubMenu={setShowSubMenu}
              setMenuNumber={setMenuNumber}
              menuTitle="Video Games"
              currentNumber={0}
              menuData={videoGames}
            />
            <MenuItem
              showSubMenu={showSubMenu}
              menuNumber={menuNumber}
              setShowSubMenu={setShowSubMenu}
              setMenuNumber={setMenuNumber}
              menuTitle="Gift Cards"
              currentNumber={1}
              menuData={cards}
            />
            <MenuItem
              showSubMenu={showSubMenu}
              menuNumber={menuNumber}
              setShowSubMenu={setShowSubMenu}
              setMenuNumber={setMenuNumber}
              menuTitle="PSN"
              currentNumber={2}
              menuData={psn}
            />
          </div>
        </div>
        <div className="site-header__actions">
          {/* <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? "search-form--active" : ""
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button> */}
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          {userName == "" ? (
            <Link href="/login">
              <button className="site-header__btn-avatar">
                <i className="icon-avatar"></i>
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="w-20">
                <i className="icon-avatar" />
                <span className="text-base">{userName}</span>
              </button>
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
      <div className="searchBox_phone">
        <input
          style={{
            width: "90%",
            alignSelf: "center",
            color: "black",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
        <div className="searchButton_phone">
          <i
            onClick={() => setSearchOpen(!searchOpen)}
            className="icon-search"
          ></i>
        </div>
      </div>
      {showSubMenu && (
        <SubMenuViewer
          setShowSubMenu={setShowSubMenu}
          lists={allMenus[menuNumber]}
        />
      )}
    </header>
  );
};

export default Header;
