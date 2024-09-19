import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CloseOutlined } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import styles from 'app/pages/MainPage/index.module.css';

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

const SaveDialog = ({ handleSave }: { handleSave: (name: string) => void }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  return (
    <>
      <Button onClick={handleOpen} className={styles.headerButton}>
        Save
      </Button>
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
          <TextField value={name} onChange={(e) => setName(e.target.value)} />
          <Button
            onClick={() => {
              handleSave(`mixtape_${name}`);
              handleClose();
            }}
            sx={{ mt: 2, fontSize: '1.2rem', fontWeight: 600 }}
          >
            SAVE
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SaveDialog;
