import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CloseOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
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

const LoadDialog = ({ handleSave }: { handleSave: (name: string) => void }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [savedMixes, setSavedMixes] = React.useState<string[]>([]);
  const getSavedMixes = () => {
    // Fetch all keys from localStorage
    const keys = Object.keys(localStorage);
    // Filter only those that contain mix data (you can use a naming convention if needed)
    return keys.filter((key) => key.includes('mixtape_')); // Adjust if you have other keys
  };
  React.useEffect(() => {
    // Get saved mixes when component mounts
    const mixes = getSavedMixes();
    setSavedMixes(mixes);
  }, [open]);

  const deleteMix = (mixName: string) => {
    localStorage.removeItem(mixName);
    setSavedMixes((prev) => prev.filter((mix) => mix !== mixName));
  };

  return (
    <>
      <Button onClick={handleOpen} className={styles.headerButton}>
        Load
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
          {savedMixes.map((item) => (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }} key={item} gap={1}>
              <Button
                onClick={() => {
                  handleSave(item);
                  handleClose();
                }}
                sx={{
                  fontSize: '1.2rem',
                  mb: 1,
                  justifyContent: 'start',
                  fontWeight: 600,
                  color: 'rgba(227, 61, 148, 1)',
                  lineHeight: 1,
                }}
              >
                {item.split('mixtape_')[1]}
              </Button>
              <IconButton onClick={() => deleteMix(item)} sx={{ height: 'fit-content' }}>
                <DeleteOutline />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default LoadDialog;
