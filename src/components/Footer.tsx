import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import '../App.css';
import '../styles/home.css'

//icons
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  return (
    <footer>
              <Grid
                container spacing={1} 
                justifyContent="center"
                className="Footer"
                sx={{
                  ['@media (max-width:800px)']: {
                    display: 'none',
                  }
                }}
              >

                <Grid item xs={3}>

                </Grid>

                <Grid item xs={1}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Company Info
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    About us
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Affiliate
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Help & Support
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Returns
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Size guide
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Online Support
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Customer care
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Contact Us
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Customer Area
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Points
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Find us on
                  </Typography>
                  <InstagramIcon />
                  <TwitterIcon />
                  <YouTubeIcon />
                  <Typography variant="overline" display="block" gutterBottom>
                    Sign up for news
                  </Typography>
                  <InputBase
                        className="EmailNewsLetter"
                        sx={{ width: '40%' }}
                        placeholder="Email here..."
                  />
                  <button className="ButtonNewsLetter">RECEIVE</button>
                  <Typography variant="caption" display="block" gutterBottom>
                    By clicking the SUBSCRIBE button, you are agreeing to ourPrivacy & Cookie Policy
                  </Typography>
                </Grid>

              </Grid>

              <Grid
                container spacing={1} 
                justifyContent="center"
                className="Footer"
                sx={{
                  textAlign: 'center',
                  marginTop: '30px',
                  ['@media (min-width:801px)']: {
                    display: 'none',
                  }
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Company Info
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    About us
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Affiliate
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Help & Support
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Returns
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Size guide
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Online Support
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Customer care
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Contact Us
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Customer Area
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Points
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Find us on
                  </Typography>
                  <InstagramIcon />
                  <TwitterIcon />
                  <YouTubeIcon />
                  <Typography variant="overline" display="block" gutterBottom>
                    Sign up for news
                  </Typography>
                  <InputBase
                        className="EmailNewsLetter"
                        sx={{ width: '40%' }}
                        placeholder="Email here..."
                  />
                  <button className="ButtonNewsLetter">RECEIVE</button>
                  <Typography variant="caption" display="block" gutterBottom>
                    By clicking the SUBSCRIBE button, you are agreeing to ourPrivacy & Cookie Policy
                  </Typography>
                </Grid>
            </Grid>

            </footer>
  )
}
