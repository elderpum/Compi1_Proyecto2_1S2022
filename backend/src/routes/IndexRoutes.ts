import { Router } from 'express';
import { IndexController } from '../controllers/indexControllers';
class IndexRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', IndexController.index);
    this.router.post('/interpretar', IndexController.interpretar);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;