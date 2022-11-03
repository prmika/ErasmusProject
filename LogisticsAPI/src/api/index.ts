import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import deliveryPath  from './routes/deliverypathRoute';
import truck from './routes/truckRoute';
import packaging from './routes/packagingRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truck(app);
	deliveryPath(app);
	packaging(app);
	
	return app
}