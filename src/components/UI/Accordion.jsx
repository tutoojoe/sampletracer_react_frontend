import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMoreIcon } from "@mui/icons-material/ExpandMore";
import React from "react";

const Accordion = () => {
  return (
    <Accordion>
      <AccordionSummary
        id="panel1-header"
        aria-controls="panel1-content"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          alias sed hic assumenda molestias dolor consequatur voluptatibus,
          veniam explicabo, in, cum dolores nesciunt at aliquid labore. Mollitia
          repudiandae atque tenetur!
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordion;
