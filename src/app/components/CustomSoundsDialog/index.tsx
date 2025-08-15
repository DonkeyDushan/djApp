import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CloseOutlined, DeleteOutline, UploadFile } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import styles from 'app/pages/MainPage/index.module.css';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  display: 'grid',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxWidth: '80vw',
  bgcolor: 'background.paper',
  border: '2px ridge #7d7d7d',
  boxShadow: 24,
  px: 4,
  py: 2,
  color: 'black',
  maxHeight: '95vh',
  overflow: 'auto',
};

const CustomSoundsDialog = ({
  onAddCustomSound,
  onRemoveCustomSound,
}: {
  onAddCustomSound: (name: string, dataUrl: string) => void;
  onRemoveCustomSound: (name: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [customSounds, setCustomSounds] = React.useState<string[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getCustomSounds = () => {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith('customSound_'))
      .sort();
  };

  React.useEffect(() => {
    if (open) {
      setCustomSounds(getCustomSounds());
    }
  }, [open]);

  const deleteSound = (soundKey: string) => {
    localStorage.removeItem(soundKey);
    const name = soundKey.replace('customSound_', '');
    onRemoveCustomSound(name);
    setCustomSounds((prev) => prev.filter((s) => s !== soundKey));
  };
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      localStorage.setItem(`customSound_${nameWithoutExt}`, dataUrl);
      setCustomSounds(getCustomSounds());
      onAddCustomSound(nameWithoutExt, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button onClick={handleOpen} className={styles.headerButton}>
        Custom sounds
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <IconButton
            sx={{ color: 'grey', justifySelf: 'end', marginBottom: 2 }}
            onClick={handleClose}
          >
            <CloseOutlined />
          </IconButton>

          <Button
            component="label"
            startIcon={<UploadFile />}
            sx={{ mb: 2, fontWeight: 600, fontSize: '1.5rem', color: '#1976d2' }}
          >
            Upload Sound
            <input
              type="file"
              accept="audio/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                  e.target.value = '';
                }
              }}
            />
          </Button>

          {customSounds.map((key) => {
            const displayName = key.replace('customSound_', '');
            return (
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }} key={key} gap={1}>
                <Button
                  onClick={() => {
                    const dataUrl = localStorage.getItem(key) || '';
                    onAddCustomSound(displayName, dataUrl);
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
                  {displayName}
                </Button>
                <IconButton onClick={() => deleteSound(key)} sx={{ height: 'fit-content' }}>
                  <DeleteOutline />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </Modal>
    </>
  );
};

export default CustomSoundsDialog;
