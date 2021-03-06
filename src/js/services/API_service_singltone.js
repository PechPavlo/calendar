class ServiceAPISingltone {
  constructor() {
    if (ServiceAPISingltone.instance instanceof ServiceAPISingltone) {
      return ServiceAPISingltone.instance;
    }

    this.settingsObject = {
      URL: 'http://158.101.166.74:8080/api/data/',
      SYSTEM: 'pavlo_pechenevskyi',
    };
    Object.freeze(this.settingsObject);
    Object.freeze(this);
    ServiceAPISingltone.instance = this;
  }

    get = async (entity) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}`;
      let result;

      try {
        const response = await fetch(url, {
          method: 'get',
        });
        const json = await response.json();
        result = json?.map((elem) => ({ id: elem.id, data: JSON.parse(elem.data.replaceAll('\\"', '"')) })) || null;
      } catch (error) {
        // console.error('Error:', error);
        this.showErrorMessage(error);
      }
      return result;
    };

    create = async (entity, entityBody) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}`;
      const data = `{"data":"${JSON.stringify(entityBody).replaceAll('"', '\\"')}"}`;
      const result = {};

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        result.id = json.id;
        result.data = JSON.parse(json.data.replaceAll('\\"', '"'));
        // console.log('Success:', result);
      } catch (error) {
        // console.error('Error:', error);
        this.showErrorMessage(error);
      }
      return result;
    };

    change = async (entity, id, entityBody) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}/${id}`;
      const data = `{"data":"${JSON.stringify(entityBody).replaceAll('"', '\\"')}"}`;
      const result = {};

      try {
        const response = await fetch(url, {
          method: 'PUT',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        result.id = json.id;
        result.data = JSON.parse(json.data.replaceAll('\\"', '"'));
        // console.log('Success:', result);
      } catch (error) {
        // console.error('Error:', error);
        this.showErrorMessage(error);
      }
      return result;
    };

    delete = async (entity, id) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}/${id}`;

      try {
        // const response = await fetch(url, {
        const { status } = await fetch(url, {
          method: 'DELETE',
        });
        console.log('Success:', status);
      } catch (error) {
        // console.error('Error:', error);
        this.showErrorMessage(error);
      }
    };

    showErrorMessage = (message) => {
      const errorModal = document.querySelector('#error-modal');
      const errorSpan = document.querySelector('.error_modal-subtitle');
      errorSpan.textContent = message;
      errorModal.classList.add('active');
    //   console.log('My error message:', message);
    };
}

const ServiceAPI = new ServiceAPISingltone();

export default ServiceAPI;
