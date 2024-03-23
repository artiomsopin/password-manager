import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRecordDto } from 'src/record/dto/create-record.dto';
import { disconnect } from 'mongoose';

const testDto: CreateRecordDto = {
  serviceName: "testServiceName",
  login: "testLogin"
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdRecordId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/record/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/record/create')
      .send(testDto)
      .expect(201)
      .then( ({ body }: request.Response) => {
        createdRecordId = body._id;
        expect(createdRecordId).toBeDefined();
      });
  });

  it('/record/delete/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/record/delete/${createdRecordId}`)
      .expect(200);
  });

  afterAll( () => {
    disconnect();
  });
});
