import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProdcuctsCard from "./ProdcuctsCard";

const ProductsTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{  typography: "body1",  background:""  }}>
      <TabContext value={value}  >
        <Box sx={{display:"flex",justifyContent:"center"}}>
          <TabList  onChange={handleChange} aria-label="lab API tabs example">
            <Tab  label="Men" value="1" />
            <Tab label="Women" value="2" />
            <Tab label="Electronics" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ display:"flex",flexWrap:"wrap" ,gap:1.5}} value="1">
        <ProdcuctsCard type="Men's Fashion" />
        </TabPanel>
        <TabPanel sx={{ display:"flex",flexWrap:"wrap" ,gap:1.5}} value="2">
        <ProdcuctsCard type="Women's Fashion" />
        </TabPanel>
        <TabPanel sx={{ display:"flex",flexWrap:"wrap" ,gap:1.5}} value="3">
          <ProdcuctsCard  type="Electronics" />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProductsTabs;
