import { BiWorld } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { BsExclamationCircle } from "react-icons/bs";
import { HiMiniKey } from "react-icons/hi2";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DataX from "../../../utils/data/dateX";
type ProductDescriptionType = {
  description: string;
  sysReq: string;
  keyAct: string;
  lang: string;
};

const Description = ({
  description,
  sysReq,
  keyAct,
  lang,
}: ProductDescriptionType) => {
  const [selectedTab, setSelectedTab] = useState(0);
  // function desValue() {
  //   if (selectedTab == 0) {
  //     return <DataX />;
  //   } else if (selectedTab == 1) {
  //     return sysReq;
  //   } else if (selectedTab == 2) {
  //     return keyAct;
  //   } else if (selectedTab == 3) {
  //     return lang;
  //   }
  // }
  const [openTabs, setOpenTabs] = useState<number[]>([]);
  const toggleTab = (tabIndex) => {
    if (openTabs.includes(tabIndex)) {
      setOpenTabs(openTabs.filter((tab) => tab !== tabIndex));
    } else {
      setOpenTabs([...openTabs, tabIndex]);
    }
  };

  return (
    <section className="product-single__description">
      <div className="product-description-block">
        <div className="hidden sm:flex justify-around align-middle py-5">
          {/* Desktop view */}
          <span
            className={`cursor-pointer ${
              selectedTab === 0 ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => setSelectedTab(0)}
          >
            <BsExclamationCircle className="inline-block mx-1" /> Description
          </span>
          <span
            className={`cursor-pointer ${
              selectedTab === 1 ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => setSelectedTab(1)}
          >
            <IoMdSettings className="inline-block mx-1" /> System requirements
          </span>
          <span
            className={`cursor-pointer ${
              selectedTab === 2 ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => setSelectedTab(2)}
          >
            <HiMiniKey className="inline-block mx-1" /> Key activation
          </span>
          <span
            className={`cursor-pointer ${
              selectedTab === 3 ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => setSelectedTab(3)}
          >
            <BiWorld className="inline-block mx-1" /> Languages
          </span>
        </div>
        <div className="transition-all ease-in-out duration-300">
          <CSSTransition
            in={selectedTab === 0}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div>{description}</div>
          </CSSTransition>
          <CSSTransition
            in={selectedTab === 1}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div>{sysReq}</div>
          </CSSTransition>
          <CSSTransition
            in={selectedTab === 2}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div>{keyAct}</div>
          </CSSTransition>
          <CSSTransition
            in={selectedTab === 3}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div>{lang}</div>
          </CSSTransition>
        </div>
      </div>
      <div className="sm:hidden">
        {/* Mobile view: Accordion list */}
        <ul>
          <li
            className={`cursor-pointer ${
              openTabs.includes(0) ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => toggleTab(0)}
          >
            <BsExclamationCircle className="inline-block mx-1" /> Description
            {openTabs.includes(0) ? (
              <div className="transition-all ease-in-out duration-300">
                <div className="text-white">{description}</div>
              </div>
            ) : null}
          </li>
          <li
            className={`cursor-pointer ${
              openTabs.includes(1) ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => toggleTab(1)}
          >
            <IoMdSettings className="inline-block mx-1" /> System requirements
            {openTabs.includes(1) ? (
              <div className="transition-all ease-in-out duration-300">
                <div className="text-white">{sysReq}</div>
              </div>
            ) : null}
          </li>
          <li
            className={`cursor-pointer ${
              openTabs.includes(2) ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => toggleTab(2)}
          >
            <HiMiniKey className="inline-block mx-1" /> Key activation
            {openTabs.includes(2) ? (
              <div className="transition-all ease-in-out duration-300">
                <div className="text-white">{keyAct}</div>
              </div>
            ) : null}
          </li>
          <li
            className={`cursor-pointer ${
              openTabs.includes(3) ? "text-[#FBB03B]" : ""
            }`}
            onClick={() => toggleTab(3)}
          >
            <BiWorld className="inline-block mx-1" /> Languages
            {openTabs.includes(3) ? (
              <div className="transition-all ease-in-out duration-300">
                <div className="text-white">{lang}</div>
              </div>
            ) : null}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Description;
