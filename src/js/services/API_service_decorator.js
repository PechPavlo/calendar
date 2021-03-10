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
    let finisedResult = null;
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    if (result) {
      finisedResult = result.map((elem) => ({ id: elem.id, data: JSON.parse(elem.data.replaceAll('\\"', '"')) }));
    }
    return finisedResult;
  }

  async create(entity, entityBody) {
    const finisedResult = {};
    const result = await this.service.create(entity, `{"data":"${JSON.stringify(entityBody).replaceAll('"', '\\"')}"}`);
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    finisedResult.id = result.id;
    finisedResult.data = JSON.parse(result.data.replaceAll('\\"', '"'));
    return finisedResult;
  }

  async change(entity, id, entityBody) {
    const finisedResult = {};
    const result = await this.service.change(entity, id, `{"data":"${JSON.stringify(entityBody).replaceAll('"', '\\"')}"}`);
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    finisedResult.id = result.id;
    finisedResult.data = JSON.parse(result.data.replaceAll('\\"', '"'));
    return finisedResult;
  }

  async delete(entity, id) {
    const result = await this.service.delete(entity, id);
    if (result.error) {
      this.showErrorMessage(`in ${entity}: ${result.error}`);
    }
    console.log(result);
    return result;
  }
}

const serviceAPIDecorated = new APIServiceDecorator(ServiceAPI);
export default serviceAPIDecorated;
