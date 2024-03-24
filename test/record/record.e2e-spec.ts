import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { disconnect } from 'mongoose';
import { TestDto } from '../utils/constants';



describe('RecordController (e2e)', () => {
  let app: INestApplication;
  let createdRecordId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create new record and return 201: /api/v1/record/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/record/create')
      .send(TestDto.CREATE_RECORD_DTO)
      .expect(201)
      .then( ({ body }: request.Response) => {
        createdRecordId = body._id;
        expect(createdRecordId).toBeDefined();
      });
  });

  it('should get all records: /api/v1/record/read/all (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/record/read/all`)
      .expect(200);
  });
  
  it('should get record by id: /api/v1/record/read/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/record/read/${createdRecordId}`)
      .expect(200);
  });

  it('should update record: /api/v1/record/update/:id (PUT)', async () => {
    return request(app.getHttpServer())
    .put(`/record/update/${createdRecordId}`)
    .send(TestDto.UPDATE_FULL_RECORD_DTO )
    .expect(200)
    .send(TestDto.UPDATE_SERVICE_NAME_RECORD_DTO)
    .expect(200)
    .send(TestDto.UPDATE_LOGIN_RECORD_DTO)
    .expect(200)
    .send(TestDto.NOT_UPDATE_PASSWORD_RECORD_DTO)
    .expect(200)
  })

  it('should update password: /api/v1/record/update/password/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch(`/record/update/password/${createdRecordId}`)
      .send(TestDto.UPDATE_PASSWORD_DTO)
      .expect(200)
      .send(TestDto.UPDATE_WITHOUT_PASSWORD_DTO)
      .expect(200)
  })

  it('should delete record by id: /api/v1/record/delete/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/record/delete/${createdRecordId}`)
      .expect(200);
  });

  afterAll( () => {
    disconnect();
  });
});
