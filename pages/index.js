import React, { useEffect } from 'react';
import getConfig from 'next/config';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CustomAppBar from '../src/components/CustomAppBar';

const fetchData = async (keyword) => {
  const { API_HOST } = getConfig().publicRuntimeConfig;

  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);

  const host = process.browser ? '' : API_HOST;
  const res = await fetch(`${host}/api/shops?${query.toString()}`);
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

  return (
    <Container component="main" sx={{ padding: '0 !important', margin: '0 !important' }}>
      <CustomAppBar value={keyword} onChange={setKeyword} onClick={() => onSearchClick()} />

      <Box
        component="form"
        noValidate
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ImageList>
          {shops.map((shop) => (
            <ImageListItem key={shop.photo.pc.l}>
              <img src={`${shop.photo.pc.l}?w=248&fit=crop&auto=format`} />

              <ImageListItemBar subtitle={<span>店名: {shop.name}</span>} position="below" />
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
