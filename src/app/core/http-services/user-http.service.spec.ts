import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { UserHttpService } from './user-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDto } from '../models';
import { concatMap, tap } from 'rxjs/operators';

describe('UserHttpService', () => {

  let userHttpService: UserHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserHttpService]
    });

    // inject the service
    userHttpService = TestBed.get(UserHttpService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('can be initialized', () => {
    expect(userHttpService).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  it('can get all users', () => {
      // call the service
      userHttpService.getUsers().subscribe(data => {
        expect(data.length).toBeGreaterThan(0);
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/usersdata');
      expect(req.request.method).toBe('GET');
    });

  it('can get a user by id', () => {
      const id = 1;
      // call the service
      userHttpService.getUserById(id).subscribe(data => {
        expect(data.id).toBe(id);
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/usersdata/1');
      expect(req.request.method).toBe('GET');

      req.flush({
        id: 1
      });

      httpMock.verify();
    });

  it('should get 404 when user id not found', () => {
      const id = 34567;
      // call the service
      userHttpService.getUserById(id).subscribe(() => fail(`should not have found user for id='${id}'`),
          err => {
            expect(err.status).toBe(404, 'should have 404 status');
          }
        );
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/usersdata/' + id);
      expect(req.request.method).toBe('GET');
    });

  it('can add a user', () => {
      const dummyUser = new UserDto(
        {
          firstName: 'Adam',
          surname: 'Miller'
        });
      // call the service
      userHttpService.addUser(dummyUser).subscribe(data => {
        expect(data.firstName).toBe('Adam');
      });

      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/usersdata', 'post to api');
      expect(req.request.method).toBe('POST');

      httpMock.verify();

    });

  it('can delete a user', () => {
      const id = 1;
      // call the service
      userHttpService.deleteuser(id).subscribe((_: {}) => {
          expect(_).toBeDefined();
        }, () => fail('fail deleting a user'));

      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/usersdata/1', 'delete to api');
      expect(req.request.method).toBe('DELETE');

      req.flush(id);

      httpMock.verify();
    });

  it('can update an existing user', () => {
      const dummyUser = new UserDto(
        {
          firstName: 'Adam',
          surname: 'Miller'
        });
      // call the service
      userHttpService.updateUser(dummyUser).subscribe(data => {
        expect(data.firstName).toBe('Adam');
      });

      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/usersdata', 'put to api');
      expect(req.request.method).toBe('PUT');

      httpMock.verify();

    });
});
