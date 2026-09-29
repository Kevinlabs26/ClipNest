// Modal confirmation and alert dialog component replacing native browser confirm/alert
import { $, uiText } from '../utils/dom.js';

// Show a customizable confirm modal returning a Promise<boolean>
export function askConfirm(message, title = '确认操作', confirmLabel = '确定', isDanger = true) {
  return new Promise(resolve => {
    const dialogEl = $('#confirm-dialog');
    if (!dialogEl) {
      resolve(false);
      return;
    }

    const titleEl = $('#confirm-dialog-title');
    const msgEl = $('#confirm-dialog-message');
    const confirmBtn = $('#confirm-dialog-btn');

    if (titleEl) titleEl.textContent = uiText(title);
    if (msgEl) msgEl.textContent = uiText(message);
    if (confirmBtn) {
      confirmBtn.textContent = uiText(confirmLabel);
      confirmBtn.classList.toggle('danger', Boolean(isDanger));
    }

    dialogEl.returnValue = '';
    const handleClose = () => {
      resolve(dialogEl.returnValue === 'confirm');
    };

    dialogEl.addEventListener('close', handleClose, { once: true });
    dialogEl.showModal();
  });
}

// Show an alert modal returning a Promise<void>
export function askAlert(message, title = '提示') {
  return askConfirm(message, title, '知道了', false);
}

// Setup backdrop click listener to cancel dialog on outside clicks
export function setupConfirmDialogListener() {
  const dialogEl = $('#confirm-dialog');
  if (dialogEl) {
    dialogEl.addEventListener('click', event => {
      if (event.target === dialogEl) {
        dialogEl.close('cancel');
      }
    });
  }
}
