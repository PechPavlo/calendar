import service from '../services/API_service_singltone';

describe('Service: test ', () => {
  const entity = 'users';
  const users = {
    id: 'a6a136dc-fd2b-4073-a1ae-214589cc73e6',
    data: { isAdmin: true, name: 'test', password: '' },
  };
  const respondUsers = `{"id":"${users.id}","data":"${JSON.stringify(
    users.data,
  ).replace(/"/g, '\\"')}"}`;

  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Service: GET- Should return users.id ', async () => {
    fetch.mockResponseOnce(JSON.stringify(respondUsers));
    const res = await service.get(entity);
    expect(JSON.parse(res).id).toEqual(users.id);
  });

  test('Service: Post- Should return users.data', async () => {
    fetch.mockResponseOnce(JSON.stringify(users));
    const res = await service.create(entity, JSON.stringify(users.data));
    expect(res.data).toEqual(users.data);
  });

  test('Service: Put- Should return users.id', async () => {
    fetch.mockResponseOnce(JSON.stringify(respondUsers));
    const res = await service.change(entity, users.id, JSON.stringify(users.data));
    expect(JSON.parse(res).id).toEqual(users.id);
  });

  test('Service: Delete Should return ok', async () => {
    fetch.mockResponseOnce("<main></main>", {
        counter: 1,
        status: 204,
        statusText: "ok",
      });
    const res = await service.delete(entity, users.id);
    console.log(res);
    expect(res).toEqual(204);
  });
});
