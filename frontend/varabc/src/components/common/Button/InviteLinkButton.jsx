import { useState } from "react";
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import swal from "sweetalert";

const InviteLinkButton = () => {

  const [open, setOpen] = useState(false);

  const onButtonClick = () => {
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setOpen(true);
      })
      .catch((error) => {
        swal("이런", "클립 보드 복사 실패"+error, "error");
      });
  };

  return (
    <>
      <button
        onClick={onButtonClick}
        type="button"
        className={`bg-white text-primary flex justify-center items-center rounded-lg font-bold w-[358px] h-[100px] text-[64px]`}
      >
        초대 URL
      </button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          초대 URL 클립보드 복사 성공!
        </Alert>
      </Snackbar>
    </>
  );
};

export default InviteLinkButton;