import ServiceAPI from './API_service_singltone';

class APIServiceDecorator {
  constructor(service) {
    this.service = service;
  }

  showErrorMessage = (message) => {
    const errorModal = document.querySelector('#error-modal');
    const errorSpan = document.querySelector('.error_modal-subtitle');
    errorSpan.textContent = message;
    errorModal.classList.add('active');
  };

  async get(entity) {
    const result = await this.service.get(entity);
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    return result;
  }

  async create(entity, entityBody) {
    const result = await this.service.create(entity, entityBody);
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    return result;
  }

  async change(entity, id, entityBody) {
    const result = await this.service.change(entity, id, entityBody);
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    return result;
  }

  async delete(entity, id) {
    const result = await this.service.delete(entity, id);
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    return result;
  }
}

const serviceAPIDecorated = new APIServiceDecorator(ServiceAPI);
export default serviceAPIDecorated;
