import  express, {Request, Response} from 'express';
import { adminRoutes } from './app/modules/admin/admin.controller';
import { productRoute } from './app/modules/products/product.controller';

const app = express();
app.use(express.json());

app.use("/auth/admin", adminRoutes)
app.use("/product", productRoute)
app.get("/", async(req: Request, res: Response)=>{
    res.status(200).json({
        message: "Wellcome to tour management App",
    })
})

export default app;