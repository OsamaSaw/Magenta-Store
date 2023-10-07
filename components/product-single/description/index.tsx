import { BiWorld } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { BsExclamationCircle } from "react-icons/bs";
import { HiMiniKey } from "react-icons/hi2";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

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
        <div className="hidden md:flex justify-around align-middle py-5">
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
      <div className="md:hidden">
        <Accordion>
          <AccordionSummary
            expandIcon={<AiFillCaretDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <BsExclamationCircle className="inline-block mx-1" /> Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{description}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<AiFillCaretDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <IoMdSettings className="inline-block mx-1" /> System requirements
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{sysReq}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<AiFillCaretDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <HiMiniKey className="inline-block mx-1" /> Key activation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{keyAct}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<AiFillCaretDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <BiWorld className="inline-block mx-1" /> Languages
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{lang}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};

export default Description;
