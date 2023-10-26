import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState } from "store";
import { SubMenuViewer } from "./subMenuViewer";
import { videoGames, cards, psn } from "utils/data/MenuData";
import { MenuItem } from "components/header/MenuItem";
import Fade from "@mui/material/Fade";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../firebase";
import { ProductType } from "types";
import { Autocomplete, Divider, Stack, TextField } from "@mui/material";
import { CustomSearchBar } from "./CustomSearchBar";

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
  const [products, setProducts] = useState<ProductType[]>([]);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const mobileSearchBar = useRef(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    await getDocs(collection(db, "ProgramDummyData")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(newData);
      setProducts(newData);
    });
  };

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  // useOnClickOutside(searchRef, closeSearch);

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!onTop) {
      setTimeout(() => {
        if (mobileSearchBar.current) {
          mobileSearchBar.current.style.display = "none";
        }
      }, 500);
    } else {
      if (mobileSearchBar.current) {
        mobileSearchBar.current.style.display = "flex";
      }
    }
  }, [onTop]);

  const searchSuggestions = useMemo(() => {
    return products.map((option, index) => ({
      yourLabel: option.name,
      id: index,
      image: option.image,
      price: option.price || 15,
      discount: option.discount || 5.5,
    }));
  }, [products]);

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
            <Stack
              sx={{
                width: "100%",
                alignSelf: "center",
                color: "black",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <CustomSearchBar
                search={search}
                searchSuggestions={searchSuggestions}
                setSearch={setSearch}
                customClassName="sm:block hidden"
              />
            </Stack>
            <div className="searchButton">
              <i
                onClick={() => router.push(`/products?search=${search}`)}
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
      <Fade timeout={500} in={onTop}>
        <div ref={mobileSearchBar} className="searchBox_phone">
          <Stack
            sx={{
              width: "100%",
              alignSelf: "center",
              color: "black",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <CustomSearchBar
              search={search}
              searchSuggestions={searchSuggestions}
              setSearch={setSearch}
            />
          </Stack>
          <div className="searchButton_phone">
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </div>
        </div>
      </Fade>
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
