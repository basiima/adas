import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Iconify from '../components/Iconify';

// components
import Page from '../components/Page';

export default function Requests() {
  return (
    <Page title="Requests">
    <Container  maxWidth="xl">
    <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Remy Sharp"
          secondary={
            <fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Document Type:
              </Typography>
              {" Masters"}
            </fragment>
          }
        />
        <div>
        <Button variant="contained" component={RouterLink} to="/dashboard/certifyDocument">
            Certify
          </Button>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Travis Howard"
          secondary={
            <fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Document Type:
              </Typography>
              {" Bachelors"}
            </fragment>
          }
        />
        <div>
        <Button variant="contained" component={RouterLink} to="/dashboard/certifyDocument">
            Certify
          </Button>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Cindy Baker"
          secondary={
            <fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Document Type:
              </Typography>
              {' Certificate'}
            </fragment>
          }
        />
        <div>
        <Button variant="contained" component={RouterLink} to="/dashboard/certifyDocument">
            Certify
          </Button>
        </div>
      </ListItem>
    </List>
    </Container>
    </Page>
  );
}
