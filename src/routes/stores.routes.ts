import express, { Router } from 'express';

import { dashboard } from '../controller/storesDashboard.controller';
import { addStoreGet, addStorePost } from '../controller/addStore.controller';
import { storeFetchApi, deleteStoreApi, updateStoreApi } from '../api/storeFetch.api';
import { logout } from '../controller/login.controller';
import { addStoreValidation, verifySession, destroySession, upload } from '../middlewares/index.middleware';

const routes: Router = express.Router();

routes.get('/dashboard', verifySession, dashboard);
routes.get('/storeDataFetchApi', storeFetchApi);
routes.post('/updateStoreApi', upload.single("logo"), addStoreValidation, updateStoreApi);
routes.get('/addStore', verifySession, addStoreGet);
routes.post('/addStore', upload.single("logo"), addStoreValidation, addStorePost);
routes.post('/deleteStore', deleteStoreApi);
routes.get('/logout', destroySession, logout);

export default routes;