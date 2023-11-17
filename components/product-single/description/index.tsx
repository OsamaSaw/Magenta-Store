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
import { ProductDataType } from "types";
import Link from "next/link";

const Description = ({ data }: { data: ProductDataType }) => {
  const [selectedTab, setSelectedTab] = useState(0);

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
      <div className="w-full">
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
          <AccordionDetails className="space-y-2">
            {data?.Description.split(".").map((line) => {
              return Boolean(line) && <Typography>{line + "."}</Typography>;
            })}
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
            {
              <div className="flex flex-col">
                {Boolean(data?.SystemRequirements) &&
                  Object.keys(data?.SystemRequirements).map(function (
                    key: string
                  ) {
                    return (
                      <span>
                        <span className="font-bold">{key + " : "}</span>
                        <span>{data?.SystemRequirements[key]}</span>
                      </span>
                    );
                  })}
              </div>
            }
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
            <>
              <div>
                <span>How To Download: </span>
                <Link className="underline" href={data?.DownloadLink || ""}>
                  Here
                </Link>
              </div>
              {data && (
                <div className="flex flex-col">
                  {Array.isArray(data.Steps) ? (
                    data.Steps.map((step: string, index: number) => (
                      <span key={index}>{step}</span>
                    ))
                  ) : (
                    <span>{data.Steps}</span>
                  )}
                </div>
              )}
            </>
          </AccordionDetails>
        </Accordion>

        {/* <Accordion>
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
        </Accordion> */}
      </div>
    </section>
  );
};

export default Description;
