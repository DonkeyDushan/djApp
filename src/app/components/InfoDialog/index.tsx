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
              'Checked recordings will play in sync when you click the large "PLAY" button. You can save these selected recordings using the "SAVE" button.'
            }
          </li>
          <li>
            {
              'Each newly checked recording will automatically sync with the current playback time of the other tracks.'
            }
          </li>
          <li>{'Individual "PLAY" buttons will play each recording independently of the rest.'}</li>
          <li>
            {
              'Custom recordings always play from the beginning, regardless of the other tracks, even if they are checked.'
            }
          </li>
        </Box>
      </Modal>
    </>
  );
};

export default InfoDialog;
