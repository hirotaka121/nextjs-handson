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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ flexGrow: 1 }}>
        <CustomAppBar />
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container>
        <Grid item xs={3}>
          <TextField
            label="キーワードを入力してください"
            variant="standard"
            margin="normal"
            fullWidth
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="contained"
            margin="normal"
            Width="10px"
            onClick={() => {
              onSearchClick();
            }}
          >
            検索
          </Button>
        </Grid>
      </Grid>
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
            <ImageListItem key={shop.img}>
              <img
                src={`${shop.photo.pc.l}?w=248&fit=crop&auto=format`}
                // srcSet={`${shop.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                // alt={shop.title}
                // loading="lazy"
              />

              <ImageListItemBar subtitle={<span>店名: {shop.name}</span>} position="below" />
            </ImageListItem>
          ))}
        </ImageList>

        <List>
          {shops.map((shop) => {
            return (
              <ListItem key={shop.id}>
                <ListItemButton
                  onClick={() => {
                    // TODO: goto shop detail
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={shop.name} src={shop.logo_image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${shop.genre.name} ${shop.name}`}
                    secondary={
                      <>
                        <Typography variant="body1" component="span">
                          {`${shop.catch} ${shop.shop_detail_memo}`}
                        </Typography>
                        <Typography variant="caption">{shop.address}</Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
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
