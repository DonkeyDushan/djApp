import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CloseOutlined, InfoOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  display: 'grid',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px ridge #7d7d7d',
  boxShadow: 24,
  px: 4,
  py: 2,
  color: 'black',
};

const InfoDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton onClick={handleOpen}>
        <InfoOutlined />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{
              color: 'grey',
              fill: 'grey',
              justifySelf: 'end',
              marginBottom: 2,
            }}
            onClick={handleClose}
          >
            <CloseOutlined />
          </IconButton>
          <li>
            {
              'Individual "PLAY" buttons will play each recording independently of the rest and only once.'
            }
          </li>
          <li>
            {
              'Checked recordings will play in sync when you click the large "PLAY" button. Checked recordings play in loop.'
            }
          </li>
          <li>
            {
              'Each newly checked recording will automatically sync with the current playback time of the other tracks.'
            }
          </li>
          <li>
            {
              'Except of custom recordings. These always play from the beginning, regardless of the other tracks, even if they are checked.'
            }
          </li>
          <li>{'First slider: volume, second slider: speed.'}</li>
          <li>{'You can save selected recordings, volume and speed using the "SAVE" button.'}</li>
          <li>
            {'Switching between saved tracks is smoothed out, so tracks fade into one another.'}
          </li>
        </Box>
      </Modal>
    </>
  );
};

export default InfoDialog;
