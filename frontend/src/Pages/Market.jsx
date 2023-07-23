import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Input,
  ListItem,
  Select,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarketData } from "../Redux/MarketProduct/action";


const Market = () => {
  const dispatch = useDispatch();
  const { marketData, loading, error } = useSelector(
    (store) => store.marketReducer
  );
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [color, setColor] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getMarketData());
    console.log(marketData);
  }, []);

  return (
    <Box style={{ width: "70%" ,margin:'auto'}}>
      <HStack p={"120px"}>
      
        <Select
          placeholder="Select order"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
        <Select
          placeholder="Select color"
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="red">Red</option>
          <option value="silver">Silver</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
        </Select>
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Car"
        />
      </HStack>

      {loading === true ? (
        <>
          <Image
            src="https://media.tenor.com/YPOStjIfQ2IAAAAM/loading-waiting.gif"
            alt="loading"
            margin="auto"
            paddingTop="90px"
            marginBottom="360px"
          />
        </>
      ) : error === true ? (
        <>
          <Image
            src="https://media.tenor.com/eDchk3srtycAAAAj/piffle-error.gif"
            alt="error"
            margin="auto"
            width="25%"
          />
        </>
      ) : (
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "30px",
            width: "90%",
            margin: "auto",
            marginTop: "30px",
            paddingBottom: "50px",
          }}
        >
          {" "}
          {marketData &&
            marketData?.map((el) => {
              return (
                <Box
                  key={el._id}
                  style={{
                    textAlign: "left",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    padding: "20px",
                    overflow: "hidden",
                  }}
                >
                  <HStack>
                    {" "}
                    <Image
                      src={el.image}
                      alt={el.title}
                      width={"45%"}
                      height={"100%"}
                      borderRadius="10px"
                      marginBottom={"10px"}
                    />
                    <Box>
                      <Text marginLeft={"20px"} style={{ fontWeight: "bold" }}>
                        Title : {el.title}
                      </Text>
                      <Text fontWeight='bold' marginLeft={"20px"}>Description :</Text>
                      <UnorderedList pl={'50px'}>
                      {el.description.map((ele,i)=>{
                        return <ListItem key={i}>{ele}</ListItem>
                      })}
                      </UnorderedList> 
                      
                      <Text fontWeight='bold' marginLeft={"20px"}>
                      Previous Buyers : <span style={{fontWeight:'normal'}}>{el.previousBuyers}</span> 
                      </Text>
                      <Text fontWeight='bold' marginLeft={"20px"}>
                      Major Scratches : <span style={{fontWeight:'normal'}}>{el.majorScratches?'YES':'NO'}</span> 
                      </Text>
                      <Text fontWeight='bold' marginLeft={"20px"}>
                        Price : <span style={{fontWeight:'normal'}}> ₹ {el.currentPrice} /-</span>
                      </Text>
                      <Text fontWeight='bold'  marginLeft={"20px"}>
                        Max Speed : <span style={{fontWeight:'normal'}}>{'180'} KM/h</span>
                      </Text>
                      <Text fontWeight='bold' marginLeft={"20px"}>
                        {" "}
                        <ul
                          style={{
                            listStyleType: "none",
                            display: "flex",
                            gap: "30px",
                          }}
                        >
                          Available Colors :
                              <li
                                style={{
                                  backgroundColor: 'red',
                                  border: "2px dotted teal",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                }}
                              >
                                {" "}
                                &nbsp;
                              </li>  
                              <li
                                style={{
                                  backgroundColor: 'black',
                                  border: "2px dotted teal",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                }}
                              >
                                {" "}
                                &nbsp;
                              </li>   
                              <li
                                style={{
                                  backgroundColor: 'blue',
                                  border: "2px dotted teal",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                }}
                              >
                                {" "}
                                &nbsp;
                              </li>      
                        </ul>
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
}

export default Market