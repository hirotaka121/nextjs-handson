import React, { useEffect } from 'react';
import getConfig from 'next/config';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CustomAppBar from '../src/components/CustomAppBar';
import Image from 'next/image';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const fetchData = async (keyword) => {
  const { API_HOST } = getConfig().publicRuntimeConfig;

  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);

  const host = process.browser ? '' : API_HOST;
  const res = await fetch(`${host}/api/shops?large_area=Z098&${query.toString()}`);
  return await res.json();
};

const Shops = ({ firstViewShops }) => {
  const [keyword, setKeyword] = React.useState('');
  const [shops, setShops] = React.useState([]);

  useEffect(() => {
    setShops(firstViewShops);
  }, [firstViewShops]);

  const onSearchClick = async () => {
    const data = await fetchData(keyword);

    setShops(data);
    setKeyword('');
  };

  console.log(shops);

  return (
    <Container component="main" sx={{ maxWidth: '100%', padding: '0 !important' }} maxWidth={false}>
      <CustomAppBar value={keyword} onChange={setKeyword} onClick={() => onSearchClick()} />

      <Box
        component="form"
        noValidate
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ImageList cols={4}>
          {shops.map((shop) => (
            <ImageListItem
              key={shop.photo.pc.l}
              sx={{
                paddingBottom: 2,
                paddingRight: 1,
                paddingLeft: 1,
              }}
            >
              <Card sx={{ maxWidth: 400 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={shop.photo.pc.l}
                    alt="green iguana"
                    onClick={() => {
                      window.open(shop.urls.pc);
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {shop.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      地域：{shop.middle_area.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

export const getServerSideProps = async (req) => {
  const data = await fetchData(req.query.keyword);

  return {
    props: {
      firstViewShops: data,
    },
  };
};

export default Shops;
