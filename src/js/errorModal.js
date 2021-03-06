import { newElement } from './createElement';

const ErrorModal = () => {
  const modalWrapper = newElement('div', 'modal_wrapper', 'error-modal');
  const modal = newElement('div', 'error_modal-container');
  const modalTitle = newElement('span', 'error_modal-title');
  const modalSubTitle = newElement('span', 'error_modal-subtitle');
  const modalFooter = newElement('div', 'error_modal-footer');
  const confirmButton = newElement('button', 'confirm_error_modal-btn', 'confirm_error');
  modalTitle.textContent = 'We have an error:';
  modalSubTitle.textContent = 'Some error';
  confirmButton.textContent = 'Confirm';
  modalFooter.insertAdjacentElement('beforeend', confirmButton);
  modal.insertAdjacentElement('beforeend', modalTitle);
  modal.insertAdjacentElement('beforeend', modalSubTitle);
  modal.insertAdjacentElement('beforeend', modalFooter);
  modalWrapper.insertAdjacentElement('beforeend', modal);
  document.body.insertAdjacentElement('beforeend', modalWrapper);
  return modalWrapper;
};

export default ErrorModal;
